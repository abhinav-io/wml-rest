var request = require('request');
var chai = require('chai');
var Server = require('../src/server/server');

describe('Server', function() {
    var assert = chai.assert,
        expect = chai.expect;
    describe('Test Basic Settings', function() {
        it('Test init', function(done) {
            this.timeout(30000);
            var server = new Server('localhost', 8080);
            server.init();
            done();
        });
        it('Test start/stop', function(done) {
            this.timeout(30000);
            var server = new Server('localhost', 8080);
            server.start(function() {
                server.stop();
            });
        });
    });
});