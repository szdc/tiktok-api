import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, { ListPostsInHashtagRequest, ListPostsInHashtagResponse } from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#listPostsInHashtag()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/challenge/aweme/\?.*'))
      .reply(200, loadTestData('listPostsInHashtag.json'), {});

    const res = await api.listPostsInHashtag({ ch_id: '1000' } as ListPostsInHashtagRequest);
    const expected: ListPostsInHashtagResponse = {
      extra: {
        now: 1000000000000,
      },
      aweme_list: [],
      cursor: 20,
      has_more: 1,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
