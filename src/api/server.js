//server.js
// JSON Server module
import { create, router as _router, defaults } from 'json-server';
const server = create();
const router = _router('src/data/db.json');

// Make sure to use the default middleware
const middlewares = defaults();

server.use(middlewares);
server.use('/api', router);

// Export the Server API
export default server;
