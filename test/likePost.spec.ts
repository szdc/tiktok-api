import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, { LikePostResponse } from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

const postId = '9999999999999999999';

describe('#likePost()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/commit/item/digg/\?.*'))
      .reply(200, loadTestData('likePost.json'), {});

    const res = await api.likePost(postId);
    const expected: LikePostResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      is_digg: 0,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#unlikePost()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/commit/item/digg/\?.*'))
      .reply(200, loadTestData('unlikePost.json'), {});

    const res = await api.unlikePost(postId);
    const expected: LikePostResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      is_digg: 1,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
