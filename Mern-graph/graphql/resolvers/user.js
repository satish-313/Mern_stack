const bcryptjs =require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const {SECRET_KEY} = require('../../config')
const User = require('../../models/User')
const {inputValidation,validateLoginInput} = require('../../utils/validation')

module.exports = {
  Mutation: {
    async register(parent,
       { registerInput: { username, email , password, confirmPassword} }
       , context, info) // parent mean previous step for example another query, args are argument,context some additional info ,info basic info
    {
      // todo validate user data
      // make sure user doesn't exit
      // hash the password
      // create a auth token

      const {valid,errors} = inputValidation(username, email , password, confirmPassword)
      if(!valid){
        throw new UserInputError('Errors', {errors})
      }

      const user = await User.findOne({username})
      if(user){
        throw new UserInputError('username is take',{
          errors:{
            username: 'This username is taken'
          }
        })
      }
      password = await bcryptjs.hash(password,13)
      const newUser = new User ({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save();
      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username,
      }, SECRET_KEY, {expiresIn: '1h'})

      return{
        ...res._doc,
        id: res._id,
        token: token,
      }
    }
  }
}