const { response } = require('express')
const User = require('../../models/user')
const genJWT = require('../../utils/jwt')

const renew = async (req, res = response) => {
  const { uid } = req

  try {
    const user = await User.findById(uid)

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid token 3'
      })
    }

    const token = await genJWT({ uid: user.id })

    return res.status(200).json({
      ok: true,
      user,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact with your admin'
    })
  }
}

module.exports = renew
