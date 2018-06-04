var chai = require('chai');
var Product = require('../src/helper/product');
var nock = require('nock');

describe('Product', function() {
    var assert = chai.assert,
        expect = chai.expect;
    describe('Test getProductDetail', function() {
        var product = null;
        beforeEach(function() {
            product = new Product();
        });
        it('Test happy path', function(done) {
            product.getProductDetail(12662817, function(err, productDetail) {
                done();
            });
        });
        it('Network call throws an error', function(done) {
            nock('http://api.walmartlabs.com')
                .get(function(uri) {
                    return uri.indexOf('items') >= 0;
                })
                .delayBody(500)
                .replyWithError({ 'message': 'Artificial error' });
            product.getProductDetail(12662817, function(err, productDetail) {
                assert.isNotNull(err);
                assert.isNull(productDetail);
                assert.strictEqual(err.message, 'Artificial error');
                done();
            });
        });
        it('statusCode anything except 200', function(done) {
            nock('http://api.walmartlabs.com')
                .get(function(uri) {
                    return uri.indexOf('items') >= 0;
                })
                .delayBody(500)
                .reply(500, 'Server error');
            product.getProductDetail(12662817, function(err, productDetail) {
                assert.isNotNull(err);
                assert.isNull(productDetail);
                assert.strictEqual(err.statusCode, 500);
                done();
            });
        });
        it('When callback sent is null', function(done) {
            product.getProductDetail(12662817, null);
            done();
        });
    });
});