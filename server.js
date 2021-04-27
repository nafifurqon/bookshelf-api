const Hapi = require('@hapi/hapi');
const routes = require('./src/routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || +5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : 'https://bookshelf-api-nafi.herokuapp.com/books',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.route(routes);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
