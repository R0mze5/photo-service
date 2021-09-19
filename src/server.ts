import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { authenticateJWT } from './passport';
import { isAuthenticated } from './middlewares';

const PORT = process.env.PORT || 3000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.use(logger('dev') as any);

server.use(authenticateJWT);

server.start({
  port: PORT,
}, () => console.log(`Server running on http://localhost:${PORT}`));
