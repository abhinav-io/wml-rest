var chai = require('chai');
var Search = require('../src/api/search');
var nock = require('nock');

describe('Search', function() {
    var assert = chai.assert,
        expect = chai.expect;
    describe('Test start', function() {
        beforeEach(function() {
            nock.cleanAll();
        });
        it('Test happy path', function(done) {
            this.timeout(30000);
            var search = new Search('backpack');
            search.start(function(err, products) {
                assert.strictEqual(products.length, 3);
                done();
            });
        });
        it('When callback sent is null', function(done) {
            this.timeout(30000);
            var search = new Search('backpack');
            search.start(null);
            done();
        });
    });
});