const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const {MONGODB} = require('./config')
const typeDefs = require('./graphql/typeDef')
const resolvers = require('./graphql/resolvers/index')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser:true,useUnifiedTopology: true})
  .then(() => {
    console.log('connected to databse')
  })

server.listen({port: 5500})
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })