//server.js
// JSON Server module
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/data/db.json');

// Make sure to use the default middleware
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

// Export the Server API
module.exports = server;
