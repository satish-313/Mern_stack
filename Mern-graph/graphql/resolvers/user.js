const bcryptjs = require('bcryptjs')
const { UserInputError } = require('apollo-server')

const User = require('../../models/User')
const { inputValidation, validateLoginInput } = require('../../utils/validation')
const { generateToken } = require('../../utils/generateToken')

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if(!valid){
        throw new UserInputError('Wrong credentials',{errors})
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('Wrong credential', { errors })
      }

      const match = await bcryptjs.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credential'
        throw new UserInputError('Wrong credential', { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token: token,
      }

    },
    async register(parent,
      { registerInput: { username, email, password, confirmPassword } }
      , context, info) // parent mean previous step for example another query, args are argument,context some additional info ,info basic info
    {
      // todo validate user data
      // make sure user doesn't exit
      // hash the password
      // create a auth token

      const { valid, errors } = inputValidation(username, email, password, confirmPassword)
      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('username is take', {
          errors: {
            username: 'This username is taken'
          }
        })
      }
      password = await bcryptjs.hash(password, 13)
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      })

      const res = await newUser.save();
      const token = generateToken(res)
      return {
        ...res._doc,
        id: res._id,
        token: token,
      }
    }
  }
}