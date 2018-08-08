import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, { UserProfileResponse } from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#getUser()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/user/\?.*'))
      .reply(200, loadTestData('getUser.json'), {});

    const res = await api.getUser('9999999999999999999');
    const expected: UserProfileResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      user: {
        avatar_larger: {
          url_list: [
            'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_1080x1080.jpeg',
          ],
        },
        avatar_medium: {
          url_list: [
            'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_720x720.jpeg',
          ],
        },
        avatar_thumb: {
          url_list: [
            'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_100x100.jpeg',
          ],
        },
        aweme_count: 1000,
        create_time: 1000000000,
        custom_verify: 'style guru',
        favoriting_count: 1000,
        follow_status: 1,
        follower_count: 1000,
        follower_status: 1,
        following_count: 1000,
        ins_id: '',
        is_verified: true,
        nickname: 'example nickname',
        region: 'US',
        room_id: 0,
        secret: 0,
        signature: 'example signature',
        total_favorited: 1000,
        twitter_id: '',
        uid: '9999999999999999999',
        unique_id: 'example',
        verification_type: 0,
        youtube_channel_id: '',
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
