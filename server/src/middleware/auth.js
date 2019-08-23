// Source: https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express-mongodb-rest-apis-2019-ad14ec818122
const jwt = require('jsonwebtoken')
const User = require('../auth/user-model')
// TODO: add verify options -- expiration time for token
const auth = async (req, res, next) => {
  try {
    // Takes the Authorization header and just grabs the token portion, then verifies it
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.PK)
    // Gets the user
    const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    // Sets the full user and token on the request for easy access, then proceeds
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}
module.exports = auth
