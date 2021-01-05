const postsResolvers = require('./Post')
const userResolvers  = require('./user')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation
  }
}