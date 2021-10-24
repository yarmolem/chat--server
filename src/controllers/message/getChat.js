const { Types } = require('mongoose')
const { response, request } = require('express')
const Message = require('../../models/message')

const getChat = async (req = request, res = response) => {
  const fromID = req.uid
  const toID = req.params.to

  if (!Types.ObjectId.isValid(toID)) {
    return res.status(401).json({
      ok: false,
      msg: 'Invalid ID'
    })
  }

  try {
    const last30 = await Message.find({
      $or: [
        { to: toID, from: fromID },
        { to: fromID, from: toID }
      ]
    })
      .limit(30)
      .sort({ createdAt: 'asc' })

    return res.status(200).json({ ok: true, messages: last30 })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Contact with your administrator'
    })
  }
}

module.exports = getChat
