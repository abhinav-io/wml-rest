var Hapi = require('hapi');
var Search = require('../api/search');
var AllProducts = require('../helper/allProducts');
var Product = require('../helper/product');

var Server = (function() {
    const hapiServer = new Hapi.Server();

    function Server(host, port) {
        this.host = host;
        this.port = port;
    }
    Server.prototype.init = function() {
        hapiServer.connection({ host: this.host, port: this.port });
        hapiServer.route({
            method: 'GET',
            path: '/search/{text}',
            handler: function(request, reply) {
                var search = new Search(request.params.text);
                search.start(function() {
                    for (var loopVar = 0; loopVar < arguments.length; loopVar++) {
                        console.log(arguments[loopVar]);
                    }
                    return reply({ q: request.query, p: request.params });
                });
            }
        });

        hapiServer.route({
            method: 'GET',
            path: '/stop',
            handler: function(request, reply) {
                hapiServer.stop();
                return reply("Server will stop in 5 seconds.");
            }
        });

        hapiServer.route({
            method: 'GET',
            path: '/allProducts',
            handler: function(request, reply) {
                return reply(AllProducts);
            }
        });

        hapiServer.route({
            method: 'GET',
            path: '/product/{item}',
            handler: function(request, reply) {
                var product = new Product();
                product.getProductDetail(request.params.item, function(err, productDetail) {
                    return reply(productDetail).type('application/json');
                });
            }
        });
    };
    Server.prototype.start = function(callback) {
        if (callback === void 0) { callback = function(err) {}; }
        hapiServer.start((err) => {
            if (err) {
                callback(err);
            }
            console.log('Server running at:', hapiServer.info.uri);
        });

    };
    return Server;
}());
module.exports = Server;