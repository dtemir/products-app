import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import { productRoutes } from './controllers/product.controller';

dotenv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5001,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route([...productRoutes]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
