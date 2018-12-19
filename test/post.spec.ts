import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  CommonUserDetails,
  GetPostResponse,
  ListPostsRequest,
  ListPostsResponse,
  Post,
} from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

const expectedPost: Post = {
  author: {} as CommonUserDetails,
  author_user_id: '9999999999999999999',
  aweme_id: '9999999999999999999',
  aweme_type: 0,
  create_time: 1546214400,
  desc: 'example post',
  music: {
    author: 'example author',
    cover_hd: {
      url_list: [
        'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_2160x2160.jpeg',
      ],
    },
    cover_large: {
      url_list: [
        'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_1080x1080.jpeg',
      ],
    },
    cover_medium: {
      url_list: [
        'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_720x720.jpeg',
      ],
    },
    cover_thumb: {
      url_list: [
        'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_100x100.jpeg',
      ],
    },
    duration: 0,
    id: '9999999999999999999',
    owner_handle: 'example handle',
    owner_id: '9999999999999999999',
    owner_nickname: 'example nickname',
    play_url: {
      url_list: [
        'http://example.com/track/9999999999999999999.mp3',
      ],
    },
    title: 'example track',
    user_count: 0,
  },
  rate: 10,
  region: 'US',
  share_url: 'https://www.musical.ly/v/9999999999999999999.html',
  statistics: {
    aweme_id: '9999999999999999999',
    comment_count: 100,
    digg_count: 100,
    play_count: 0,
    share_count: 100,
  },
  status: {
    allow_comment: true,
    allow_share: true,
    is_delete: false,
    is_private: false,
  },
  text_extra: [
    {
      hashtag_name: 'example',
      type: 1,
    },
  ],
  user_digged: 1,
  video: {
    cover: {
      url_list: [
        'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_300x400.jpeg',
      ],
    },
    download_addr: {
      url_list: [
        'http://example.com/play/?video_id=9999999999999999999',
      ],
    },
    duration: 15000,
    has_watermark: true,
    height: 960,
    origin_cover: {
      url_list: [
        'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_900x1200.jpeg',
      ],
    },
    ratio: '720p',
    width: 540,
  },
};

describe('#getPost()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/aweme/detail/\?.*'))
      .reply(200, loadTestData('getPost.json'), {});

    const res = await api.getPost('9999999999999999999');
    const expected: GetPostResponse = {
      extra: {
        now: 1000000000000,
      },
      aweme_detail: expectedPost,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#listPosts()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/aweme/post/\?.*'))
      .reply(200, loadTestData('listPosts.json'), {});

    const res = await api.listPosts({ user_id: '9999999999999999999' } as ListPostsRequest);
    const expected: ListPostsResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      aweme_list: [expectedPost],
      has_more: true,
      status_code: 0,
      max_cursor: 1000000000000,
      min_cursor: 1000000000000,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
