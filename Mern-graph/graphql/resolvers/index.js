const postsResolvers = require('./Post')
const userResolvers  = require('./user')
const commentResolvers = require('./comments')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation
  }
}