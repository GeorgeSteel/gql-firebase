import Fastify from 'fastify';
import GQL from 'fastify-gql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema.gql';
import resolvers from './resolvers/resolvers';
import db from './db';

const app = Fastify();
const port = 4000 || process.env.PORT;

app.register(GQL, {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: 'playground',
    routes: true,
    jit: 1,
    async context(request, reply) {
        return await {
            db
        }
    },
    subscription: true
});

app.listen(port, () => console.log('Server running on: http://localhost:4000/playground'));