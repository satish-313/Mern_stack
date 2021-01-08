const {gql} = require('apollo-server')

module.exports = gql`
  type Comment{
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }

  type Like{
    id: ID!
    createdAt: String!
    username: String!
  }

  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }

  type User{
    id: ID!
    email: String!
    username: String!
    createdAt: String!
    token: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query{
    getPosts: [Post]
    getPost(postId: ID!):Post
  }

  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId:ID!): String!
    createComment(postId: String!,body: String!):Post!
    deleteComment(postId:String!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }

  type Subscription{
    newPost: Post!
  }
`