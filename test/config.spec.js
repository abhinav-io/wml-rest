var chai = require('chai');
var config = require('../src/helper/config');

describe('Config', function() {
    var assert = chai.assert,
        expect = chai.expect;
    describe('Test getGitHubUrl', function() {
        it('Return URL is from githubusercontent', function() {
            var getGitHubUrl = config.getGitHubUrl();
            assert.ok((getGitHubUrl.indexOf('githubusercontent') > 0));
        });
    });
    describe('Test getProductCodeUrl', function() {
        it('An error is thrown because Product code is null', function() {
            var fnWithNull = function() {
                config.getProductCodeUrl(null);
            };
            assert.throws(fnWithNull, 'productCode is null');
        });
        it('An error is thrown because Product code is empty string', function() {
            var fnWithEmptyString = function() {
                config.getProductCodeUrl('');
            };
            assert.throws(fnWithEmptyString, 'productCode is an invalid string');
        });
        it('An error is thrown because Product code is negative number', function() {
            var fnWithNegativeNumber = function() {
                config.getProductCodeUrl(-1);
            };
            assert.throws(fnWithNegativeNumber, 'productCode is an invalid number');
        });
        it('Get a good URL when a right parameter is sent as string', function() {
            var resp = config.getProductCodeUrl('prodcode');
            assert.strictEqual(resp, 'http://api.walmartlabs.com/v1/items/prodcode?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj');
        });
        it('Get a good URL when a right parameter is sent as number', function() {
            var resp = config.getProductCodeUrl(12345678);
            assert.strictEqual(resp, 'http://api.walmartlabs.com/v1/items/12345678?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj');
        });
    });
});