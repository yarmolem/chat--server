const jwt = require('jsonwebtoken')

const checkJwt = (req, res, next) => {
  const token = req.header('x-token')

  try {
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'Invalid token 1'
      })
    }

    const { uid } = jwt.verify(token, process.env.JWT_KEY)
  
    req.uid = uid
  } catch (e) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token 2'
    })
  }

  next()
}

module.exports = checkJwt
