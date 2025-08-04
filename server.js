import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js'
// const typeDefs = require('./schema/typeDefs');
// const resolvers = require('./schema/resolvers');
// import db from './models/index.js';
// console.log(db.Ratings.findAll(), '---')
// require('dotenv').config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
  
};

startServer();
