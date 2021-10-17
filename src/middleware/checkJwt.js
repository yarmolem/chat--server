const jwt = require('jsonwebtoken')

const checkJwt = (req, res, next) => {
  const token = req.header('x-token')

  try {
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'Token no enviado'
      })
    }

    const { uid } = jwt.verify(token, process.env.JWT_KEY)
    req.uid = uid
  } catch (e) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    })
  }

  next()
}

module.exports = checkJwt
