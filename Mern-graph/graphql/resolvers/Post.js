const { UserInputError, AuthenticationError } = require('apollo-server')

const { findById } = require('../../models/Post');
const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({createdAt: -1})
        return posts;
      } catch (error) {
        throw new Error(error)
      }
    },
    async getPost(_,{postId}){
      try {
        const post = await Post.findById(postId)
        if(post){
          return post;
        }
        else{
          throw new Error('Post not found')
        }
      } catch (error) {
        throw new Error(err)
      }
    }
  },
  Mutation:{
    async createPost(_,{body},context){
      const user = checkAuth(context)

      if(body.trim() === ""){
        throw new UserInputError("post can't be empty")
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })
      const post = await newPost.save()
      context.pubsub.publish('NEW_POST',{
        //payload
        newPost: post
      })
      return post
    },
    async deletePost(_,{postId}, context){
      const user = checkAuth(context)
      
      try {
        const post = await Post.findById(postId);
        if(user.username === post.username){
          await post.delete()
          return 'post deleted succefully'
        }
        else{
          throw new AuthenticationError('Action not allowed')
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Subscription: {
    newPost: {
      subscribe: (_,__,{pubsub}) => pubsub.asyncIterator('NEW_POST')
    }
  }
}