import { assert } from 'chai';
import { describe, it } from 'mocha';
import { encryptWithXOR } from '../src/cryptography';

describe('#encryptWithXOR()', () => {
  it('should encrypt correctly', () => {
    assert.equal(encryptWithXOR('user@example.com'), '7076607745607d64687569602b666a68');
    assert.equal(encryptWithXOR('password'), '75647676726a7761');
  });
});
