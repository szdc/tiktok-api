import { assert } from 'chai';
import { beforeEach, describe, it } from 'mocha';

import './support/setup';
import TikTokAPI from '../src';
import { mockConfig, mockParams } from './util';
import { ListFollowersRequest, TikTokAPIConfig } from '../src/types';

describe('TikTokAPI', () => {
  describe('#constructor()', () => {
    it('should throw an error if the signURL config param is not supplied', () => {
      assert.throws(
        () => new TikTokAPI(mockParams, {} as TikTokAPIConfig),
        'You must supply a signURL function to the TikTokAPI config',
      );
    });
  });

  describe('#signRequest()', () => {
    it('should throw an error if the paramsSerializer function is not supplied', () => {
      const api = new TikTokAPI(mockParams, mockConfig, { paramsSerializer: undefined });
      assert.isRejected(
        api.listFollowers({ user_id: '9999999999999999999' } as ListFollowersRequest),
        'Missing required paramsSerializer function',
      );
    });
  });

  describe('#transformResponse()', () => {
    let api: TikTokAPI;

    beforeEach(() => {
      api = new TikTokAPI(mockParams, mockConfig);
    });

    it('should not attempt to transform empty responses', async () => {
      assert.equal(api.transformResponse(''), '');
    });

    it('should convert big integers to their string representation', async () => {
      assert.deepStrictEqual(
        api.transformResponse('{"big_int":9999999999999999999,"small_int":1}'),
        { big_int: '9999999999999999999', small_int: 1 });
    });
  });
});
