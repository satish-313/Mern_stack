const {UserInputError,AuthenticationError} = require('apollo-server')

const Post = require('../../models/Post')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
  Mutation:{
    createComment: async(_,{postId,body},context) => {
      const {username} = checkAuth(context)
      if(body.trim() === ""){
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comments body must not be empty'
          }
        })
      }

      const post = await Post.findById(postId)
      if(post){
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })

        await post.save()
        return post
      }
      else{
        throw new UserInputError("post not found")
      }
    },
    deleteComment: async (_,{postId,commentId},context) => {
      const {username} = checkAuth(context);

      const post = await Post.findById(postId)

      if(post){
        const commentindex = post.comments.findIndex(c => c.id === commentId);
        if(post.comments[commentindex].username === username){
          post.comments.splice(commentindex,1)
          await post.save()
          return post
        }
        else{
          throw new AuthenticationError("Action not allowed")
        }
      }
      else{
        throw new UserInputError("post not found")
      }
    },
    likePost: async(_,{postId},context) => {
      const {username} = checkAuth(context)

      const post = await Post.findById(postId)
      if(post){
        if(post.likes.find(like => like.username === username)){
          // post already lile
          post.likes = post.likes.filter(like => like.username !== username)
        }
        else{
          // not like
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
        }
        await post.save()
        return post
      }
      else{
        throw new UserInputError("post not found")
      }
    }
  }
}