import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, { ListFeedResponse, ListForYouFeedResponse } from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#listForYouFeed()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/feed/\?.*'))
      .reply(200, loadTestData('listForYouFeed.json'), {});

    const res = await api.listForYouFeed();
    const expected: ListForYouFeedResponse = {
      extra: {
        now: 1000000000000,
      },
      aweme_list: [],
      max_cursor: 0,
      min_cursor: 0,
      has_more: 1,
      home_model: 1,
      refresh_clear: 1,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#listFollowingFeed()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/feed/\?.*'))
      .reply(200, loadTestData('listFollowingFeed.json'), {});

    const res = await api.listFollowingFeed();
    const expected: ListFeedResponse = {
      extra: {
        now: 1000000000000,
      },
      aweme_list: [],
      max_cursor: 0,
      min_cursor: 0,
      has_more: 1,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
