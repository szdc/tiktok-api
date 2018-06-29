import { assert } from 'chai';
import { beforeEach, describe, it } from 'mocha';

import MusicallyAPI from '../src';
import { mockConfig, mockParams } from './util';

describe('MusicallyAPI', () => {
  describe('#transformResponse()', () => {
    let api: MusicallyAPI;

    beforeEach(() => {
      api = new MusicallyAPI(mockParams, mockConfig);
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
