const Hapi = require('@hapi/hapi');
const bookRoute = require('./router/bookRoute');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || +5000,
    host: process.env.HOST || '0.0.0.0' || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const response = h.response({
        status: 'success',
        message: 'Welcome to Bookshelf API. Please access "/books" path.',
      });
      response.code(200);
      return response;
    },
  });

  await server.route(bookRoute);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
