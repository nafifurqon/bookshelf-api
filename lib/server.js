const Hapi = require('@hapi/hapi');
const bookRoute = require('../router/book');

const server = Hapi.server({
  port: process.env.PORT || +5000,
  host: process.env.HOST || '0.0.0.0' || 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

server.route(bookRoute);

const init = async () => {
  await server.initialize();
  return server;
};

const start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = { init, start };
