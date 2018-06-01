const Server = require('./server/server');

// Create a server with a host and port
// const server = new Hapi.Server();
const server = new Server("localhost", "8080");
server.init();
server.start((err) => {
    if (err) {
        throw err;
    }
});

/*
server.connection({
    host: 'localhost',
    port: Number(process.argv[2]) || 8080
});

server.route({
    method: 'GET',
    path: '/search/{text}',
    handler: function(request, reply) {
        return reply({ q: request.query, p: request.params });
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
*/