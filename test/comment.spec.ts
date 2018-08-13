import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  CommonUserDetails,
  ListCommentsRequest,
  ListCommentsResponse,
  PostCommentResponse,
} from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

const postId = '9999999999999999999';

describe('#listComments()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/comment/list/\?.*'))
      .reply(200, loadTestData('listComments.json'), {});

    const res = await api.listComments({ aweme_id: '9999999999999999999' } as ListCommentsRequest);
    const expected: ListCommentsResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      comments: [
        {
          aweme_id: '9999999999999999999',
          cid: '9999999999999999999',
          create_time: 1000000000,
          digg_count: 0,
          reply_id: '0',
          status: 1,
          text: 'example comment',
          text_extra: [],
          user: {} as CommonUserDetails,
          user_digged: 0,
        },
      ],
      cursor: 20,
      has_more: 1,
      status_code: 0,
      total: 50,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#postComment()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onPost(new RegExp('aweme/v1/comment/publish/\?.*'))
      .reply(200, loadTestData('postComment.json'), {});

    const res = await api.postComment(postId, 'example comment');
    const expected: PostCommentResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      comment: {
        aweme_id: '9999999999999999999',
        cid: '9999999999999999999',
        create_time: 1000000000,
        digg_count: 0,
        reply_id: '0',
        status: 4,
        text: 'example comment',
        text_extra: [],
        user: {} as CommonUserDetails,
        user_digged: 0,
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
