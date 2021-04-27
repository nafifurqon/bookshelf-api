const Hapi = require('@hapi/hapi');
const routes = require('./src/routes');

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

  await server.route(routes);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();
