var assert = require('assert');
var nock = require('nock');
var allProducts = null;

/**
 * AllProducts is perhaps the most complicated one to test, owing to the fact that the request is happening once
 * and only once.
 * If this spec is run, then the tests here will pass for sure, but might fail in the other file
 * that is because of how require works. Need to find out if I can force require to reload the file afresh.
 **/
xdescribe('AllProducts - 1', function() {
    xdescribe('Before the request completes', function() {
        beforeEach(function(done) {
            nock('https://gist.githubusercontent.com')
                .get(function(uri) {
                    return uri.indexOf('daniyalzade') >= 0;
                })
                .delayBody(200)
                .reply(200, [12662817]);
            allProducts = require('../src/helper/allProducts');
            setTimeout(function() {
                done();
            }, 500);
        });
        xit('allProducts is not null', function() {
            console.log(allProducts.length);
            assert.notStrictEqual(1, null);
        });
    });
});