var Server = require('./server/server');

var server = new Server("localhost", "8080");

server.init();
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(AllProducts);
});