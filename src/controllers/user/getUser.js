const User = require('../../models/user')
const { response, request } = require('express')
const { Types } = require('mongoose')

const getUser = async (req = request, res = response) => {
  const uid = req.params.uid

  if (!Types.ObjectId.isValid(uid)) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid ID'
    })
  }

  try {
    const user = await User.findById(uid)
    return res.status(200).json({ ok: true, user })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Contact with your administrator'
    })
  }
}

module.exports = getUser
