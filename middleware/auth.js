const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  req.auth = () => {
    let token = req.headers.authorization.split(' ')[1]
    let decodedToken = jwt.decode(token, {complete: true})
    return decodedToken.payload
  }
  next()
}

module.exports = {
  auth
}