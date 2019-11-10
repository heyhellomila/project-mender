const assert  = require('assert');

const pluralize = require('../lib/example').pluralize;

describe('example', function () {
  describe('pluralize', function () {
    it('keeps singular when count is 1', function () {
      assert.strictEqual(pluralize(1, 'cat'), '1 cat');
    });
  });
});
