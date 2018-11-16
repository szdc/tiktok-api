import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  ApproveFollowResponse,
  FollowResponse,
  ListReceivedFollowRequestsResponse,
  RejectFollowResponse,
} from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

const userId = '9999999999999999999';

describe('#follow()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/commit/follow/user/\?.*'))
      .reply(200, loadTestData('follow.json'), {});

    const res = await api.follow(userId);
    const expected: FollowResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      follow_status: 1,
      status_code: 0,
      watch_status: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#unfollow()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/commit/follow/user/\?.*'))
      .reply(200, loadTestData('unfollow.json'), {});

    const res = await api.unfollow(userId);
    const expected: FollowResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      follow_status: 0,
      status_code: 0,
      watch_status: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#listReceivedFollowRequests()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/user/following/request/list/\?.*'))
      .reply(200, loadTestData('listReceivedFollowRequests.json'), {});

    const res = await api.listReceivedFollowRequests({ count: 10, max_time: 1000000000 });
    const expected: ListReceivedFollowRequestsResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      request_users: [],
      has_more: false,
      max_time: 1000000000,
      min_time: 1000000001,
      status_code: 0,
      total: 1,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#approveFollowRequest()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/commit/follow/request/approve/\?.*'))
      .reply(200, loadTestData('approveFollowRequest.json'), {});

    const res = await api.approveFollowRequest(userId);
    const expected: ApproveFollowResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      approve_status: 0,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#rejectFollowRequest()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/commit/follow/request/reject/\?.*'))
      .reply(200, loadTestData('rejectFollowRequest.json'), {});

    const res = await api.rejectFollowRequest(userId);
    const expected: RejectFollowResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      reject_status: 0,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
