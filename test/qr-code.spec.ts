import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import TikTokAPI, { QRCodeResponse } from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';

describe('#getQRCode()', () => {
  it('a successful response should match the interface', async () => {
    const api = new TikTokAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    const userId = '9999999999999999999';

    mock
      .onPost(new RegExp('aweme/v1/fancy/qrcode/info/\?.*'))
      .reply(200, loadTestData('getQRCode.json'), {});

    const res = await api.getQRCode(userId);
    const expected: QRCodeResponse = {
      extra: {
        now: 1000000000000,
      },
      qrcode_url: {
        uri: 'musically-qrcode/1111111111111111111',
        url_list: [
          'http://p16.muscdn.com/img/musically-qrcode/1111111111111111111~c5_720x720.image',
        ],
      },
      status_code: 0,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
