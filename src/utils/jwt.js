const jwt = require('jsonwebtoken')

const genJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      }
    )
  })
}

const verifyJWT = (token) => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    return [true, uid]
  } catch (error) {
    return [false, null]
  }
}

module.exports = { genJWT, verifyJWT }
