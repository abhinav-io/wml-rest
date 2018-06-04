var assert = require('assert');
var allProducts = require('../src/helper/allProducts');

describe('AllProducts', function() {
    describe('Before the request completes', function() {
        it('allProducts is not null', function() {
            assert.notStrictEqual(allProducts, null);
        });
        it('allProducts Length should be 0', function() {
            assert.strictEqual(allProducts.length, 0);
        });
    });
    describe('Let the request complete', function() {
        before(function(done) {
            setTimeout(function() {
                done();
            }, 500);
        });
        it('allProducts is not null', function() {
            assert.notStrictEqual(allProducts, null);
        });
        it('allProducts Length should be more than 0', function() {
            assert.ok(allProducts.length > 0);
        });
        it('allProducts should contain 12662817', function() {
            var found = false;
            for (var loopVar = 0; loopVar < allProducts.length; loopVar++) {
                if (allProducts[loopVar] == '12662817') {
                    found = true;
                    break;
                }
            }
            assert.ok(found);
        });
    });
});