import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, {
  LoginErrorData,
  LoginResponse,
  LoginSuccessData,
} from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#loginWithEmail()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    const sessionId = '1234567890abcdef1234567890abcdef';
    const sessionCookie = `sessionid=${sessionId}; Path=/; Domain=musical.ly; Max-Age=2592000; HttpOnly`;
    const token = 'token';
    mock
      .onPost(new RegExp('passport/user/login/\?.*'))
      .reply(200, loadTestData('login.json'), {
        'set-cookie': sessionCookie,
        'x-tt-token': token,
      });

    const res = await api.loginWithEmail('user@example.com', 'password');
    const expected: LoginResponse = {
      data: {
        area: '',
        avatar_url: '',
        bg_img_url: '',
        birthday: '',
        can_be_found_by_phone: 1,
        connects: [],
        description: '',
        email: 'u**r@example.com',
        followers_count: 0,
        followings_count: 0,
        gender: 0,
        industry: '',
        is_blocked: 0,
        is_blocking: 0,
        is_recommend_allowed: 1,
        media_id: 0,
        mobile: '',
        name: 'user',
        new_user: 0,
        recommend_hint_message: '同时推荐给我的粉丝',
        screen_name: 'user',
        session_key: sessionId,
        skip_edit_profile: 0,
        user_auth_info: '',
        user_id: '9999999999999999999',
        user_verified: false,
        verified_agency: '',
        verified_content: '',
        visit_count_recent: 0,
      } as LoginSuccessData,
      message: 'success',
    };
    assert.deepStrictEqual(res.data, expected);

    api.cookieJar.getCookies(<string>res.config.url, (err, cookies) => {
      assert.isNull(err);
      assert.lengthOf(cookies, 1);
      assert.strictEqual(cookies[0].value, sessionId);
    });

    assert.strictEqual(api.request.defaults.headers.common['x-tt-token'], token);
  });

  it('an error response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onPost(new RegExp('passport/user/login/\?.*'))
      .reply(200, loadTestData('login-error.json'), {});

    const res = await api.loginWithEmail('user@example.com', 'incorrect_password');
    const expected: LoginResponse = {
      data: {
        captcha: '',
        description: 'Wrong password',
        error_code: 1009,
      } as LoginErrorData,
      message: 'error',
    };
    assert.deepStrictEqual(res.data, expected);
  });
});

describe('#loginWithUsername()', () => {
  it('should call the TikTok API', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onPost(new RegExp('passport/user/login/\?.*'))
      .reply(200, loadTestData('login.json'), {});

    api.request.interceptors.request.use((config) => {
      assert.propertyVal(config.params, 'username', '707660776b646860');
      assert.propertyVal(config.params, 'password', '75647676726a7761');
      return config;
    });

    await api.loginWithUsername('username', 'password');
  });
});
