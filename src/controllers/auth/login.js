const bcrypt = require('bcryptjs')
const { response } = require('express')
const User = require('../../models/user')
const genJWT = require('../../utils/jwt')

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    // Check if the email already exits
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'Email or password is incorrect 1'
      })
    }

    // Check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(404).json({
        ok: false,
        msg: 'Email or password is incorrect 2'
      })
    }

    // Generate jwt
    const token = await genJWT({ uid: user.id })

    return res.status(200).json({ ok: true, user, token })
  } catch (error) {
    console.log({ ...error })
    res.status(500).json({
      ok: false,
      msg: 'Contact with your administrator'
    })
  }
}

module.exports = login
