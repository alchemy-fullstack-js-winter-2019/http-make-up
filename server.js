const http = require('http');
const app = require('./lib/app');

const PORT = 7898 || process.env.PORT;

http
  .createServer(app)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
