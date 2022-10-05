const jwt = require("jsonwebtoken")

const generateJWT = (payload) => {
  let token = null
  token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

  return token
}

module.exports = generateJWT
