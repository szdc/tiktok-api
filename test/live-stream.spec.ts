import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  BaseResponseData,
  CanStartLiveStreamResponse,
  CommonUserDetails,
  CreateLiveStreamRoomResponse,
  JoinLiveStreamResponse,
  UpdateLiveStreamStatusResponse,
} from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#joinLiveStream()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/room/enter/\?.*'))
      .reply(200, loadTestData('joinLiveStream.json'), {});

    const roomId = '9999999999999999999';
    const streamId = '9000000000000000000';
    const res = await api.joinLiveStream(roomId);
    const expected: JoinLiveStreamResponse = {
      extra: {
        now: 1000000000000,
      },
      room: {
        create_time: 1000000000,
        finish_time: 1000000001,
        owner: {} as CommonUserDetails,
        room_id: roomId,
        status: 0,
        stream_id: streamId,
        stream_url: {
          rtmp_pull_url: `http://pull-flv-l1-mus.pstatp.com/hudong/stream-${streamId}.flv`,
          sid: streamId,
        },
        title: 'Example',
        user_count: 1000,
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#leaveLiveStream()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/room/leave/\?.*'))
      .reply(200, loadTestData('leaveLiveStream.json'), {});

    const roomId = '9999999999999999999';
    const res = await api.leaveLiveStream(roomId);
    const expected: BaseResponseData = {
      extra: {
        now: 1000000000000,
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#canStartLiveStream()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/live/podcast/\?.*'))
      .reply(200, loadTestData('canStartLiveStream.json'), {});

    const res = await api.canStartLiveStream();
    const expected: CanStartLiveStreamResponse = {
      extra: {
        now: 1000000000000,
      },
      can_be_live_podcast: true,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#createLiveStreamRoom()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onPost(new RegExp('aweme/v1/room/create/\?.*'))
      .reply(200, loadTestData('createLiveStreamRoom.json'), {});

    const roomId = '9999999999999999999';
    const streamId = '9000000000000000000';
    const title = 'TITLE';

    const res = await api.createLiveStreamRoom(title);
    const expected: CreateLiveStreamRoomResponse = {
      extra: {
        now: 1000000000000,
      },
      room: {
        title,
        create_time: 1000000000,
        finish_time: 1000000000,
        owner: {} as CommonUserDetails,
        room_id: roomId,
        status: 0,
        stream_id: streamId,
        stream_url: {
          rtmp_pull_url: `http://pull-flv-l1-mus.pstatp.com/hudong/stream-${streamId}.flv`,
          rtmp_push_url: `rtmp://push-rtmp-l1-mus.pstatp.com/hudong/stream-${streamId}?wsSecret=1234&wsTime=1a1a1a1a`,
          sid: streamId,
        },
        user_count: 0,
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#startLiveStream()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onPost(new RegExp('aweme/v1/room/create/\?.*'))
      .reply(200, loadTestData('createLiveStreamRoom.json'), {});
    mock
      .onGet(new RegExp('aweme/v1/room/update/status/\?.*'))
      .reply(200, loadTestData('updateLiveStreamStatus.json'), {});

    const roomId = '9999999999999999999';
    const streamId = '9000000000000000000';
    const title = 'TITLE';

    const res = await api.startLiveStream(title);
    const expected: CreateLiveStreamRoomResponse = {
      extra: {
        now: 1000000000000,
      },
      room: {
        title,
        create_time: 1000000000,
        finish_time: 1000000000,
        owner: {} as CommonUserDetails,
        room_id: roomId,
        status: 0,
        stream_id: streamId,
        stream_url: {
          rtmp_pull_url: `http://pull-flv-l1-mus.pstatp.com/hudong/stream-${streamId}.flv`,
          rtmp_push_url: `rtmp://push-rtmp-l1-mus.pstatp.com/hudong/stream-${streamId}?wsSecret=1234&wsTime=1a1a1a1a`,
          sid: streamId,
        },
        user_count: 0,
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });

  it('should throw an error if the live stream room could not be created', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onPost(new RegExp('aweme/v1/room/create/\?.*'))
      .reply(200, { status_code: 3 }, {});

    assert.isRejected(api.startLiveStream('TITLE'), /could not be created/);
  });

  it('should throw an error if the live stream could not be started', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onPost(new RegExp('aweme/v1/room/create/\?.*'))
      .reply(200, loadTestData('createLiveStreamRoom.json'), {});
    mock
      .onGet(new RegExp('aweme/v1/room/update/status/\?.*'))
      .reply(200, { status_code: 3 }, {});

    assert.isRejected(api.startLiveStream('TITLE'), /could not be started/);
  });
});

describe('#endLiveStream()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/room/update/status/\?.*'))
      .reply(200, loadTestData('updateLiveStreamStatus.json'), {});

    const res = await api.endLiveStream('9999999999999999999', '9000000000000000000');
    const expected: UpdateLiveStreamStatusResponse = {
      extra: {
        now: 1000000000000,
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
