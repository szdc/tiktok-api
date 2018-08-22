import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  ChallengeInfo,
  CommonUserDetails,
  HashtagSearchResponse,
  UserSearchResponse,
} from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#searchUsers()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/discover/search/\?.*'))
      .reply(200, loadTestData('searchUsers.json'), {});

    const res = await api.searchUsers({ keyword: 'example', count: 10, cursor: 0 });
    const expected: UserSearchResponse = {
      extra: {
        now: 1000000000000,
      },
      user_list: [
        {
          position: [{
            begin: 0,
            end: 6,
          }],
          uniqid_position: [],
          user_info: {} as CommonUserDetails,
        },
      ],
      type: 1,
      cursor: 1,
      has_more: 1,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#searchHashtags()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/challenge/search/\?.*'))
      .reply(200, loadTestData('searchHashtags.json'), {});

    const res = await api.searchHashtags({ keyword: 'example', count: 10, cursor: 0 });
    const expected: HashtagSearchResponse = {
      extra: {
        now: 1000000000000,
      },
      challenge_list: [
        {
          challenge_info: {} as ChallengeInfo,
          position: [{
            begin: 0,
            end: 6,
          }],
        },
      ],
      is_match: true,
      keyword_disabled: 0,
      cursor: 1,
      has_more: 1,
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
