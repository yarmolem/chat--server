const bcrypt = require('bcryptjs')
const { response } = require('express')
const User = require('../../models/user')
const genJWT = require('../../utils/jwt')

const register = async (req, res = response) => {
  const { name, email, password } = req.body

  try {
    // Check if the email already exits
    const hasEmail = await User.findOne({ email })
    if (hasEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already exists'
      })
    }

    // Encrypt password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // Save user
    const user = new User({ name, email, password: hash })
    await user.save()

    // Generate token
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

module.exports = register
