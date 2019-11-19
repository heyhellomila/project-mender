const assert  = require('assert');

const pluralize = require('../lib/script').pluralize;

describe('example', function () {
  describe('pluralize', function () {
    it('keeps singular when count is 1', function () {
      assert.strictEqual(pluralize(1, 'cat'), '1 cat');
    });
    
    // covers `else`
    it('uses explicit plural when given', function () {
      assert.strictEqual(pluralize(3, 'mouse', 'mice'), '3 mice');
    });

    // covers line 6, after `||`
    it('uses implicit plural otherwise', function () {
      assert.strictEqual(pluralize(3, 'cat'), '3 cats');
    });
  });
});