const Hapi = require('hapi');

(function() {
    var Server = (function() {
        const server = new Hapi.Server();

        function Server(host, port) {
            this.host = host;
            this.port = port;
        }
        Server.prototype.init = function() {
            server.connection({ host: this.host, port: this.port });
            server.route({
                method: 'GET',
                path: '/search/{text}',
                handler: function(request, reply) {
                    return reply({ q: request.query, p: request.params });
                }
            });
            server.route({
                method: 'GET',
                path: '/stop',
                handler: function(request, reply) {
                    server.stop();
                    return reply("Server will stop in 5 seconds.");
                }
            });
        };
        Server.prototype.start = function(callback) {
            if (callback === void 0) { callback = function(err) {}; }
            server.start((err) => {
                if (err) {
                    callback(err);
                }
                console.log('Server running at:', server.info.uri);
            });

        };
        return Server;
    }());
    module.exports = Server;
})();

//var server = new Server("localhost", 8080);
//server.init();
//server.start();