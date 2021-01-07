const jwt = require('jsonwebtoken')

// local import
const {SECRET_KEY} = require('../config')

module.exports.generateToken = (user) => {
  return (
    jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
  }, SECRET_KEY, { expiresIn: '1h' })
  )
}