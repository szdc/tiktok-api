import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, { ListCategoriesResponse } from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#listCategories()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/category/list/\?.*'))
      .reply(200, loadTestData('listCategories.json'), {});

    const res = await api.listCategories();
    const expected: ListCategoriesResponse = {
      extra: {
        now: 1000000000000,
      },
      category_list: [
        {
          aweme_list: [],
          category_type: 0,
          challenge_info: {
            author: {},
            cha_name: 'examplechallenge',
            cid: '9999999',
            desc: 'example',
            is_pgcshow: false,
            schema: '',
            type: 0,
            user_count: 100000,
          },
          desc: 'Trending Hashtag',
        },
      ],
      cursor: 10,
      has_more: 1,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
