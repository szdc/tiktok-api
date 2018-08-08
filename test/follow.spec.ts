import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  FollowResponse,
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
