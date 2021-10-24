const Message = require('./message')

class Messages {
  async saveMessage(msg) {
    const message = new Message(msg)
    await message.save()
    return message
  }
}

module.exports = Messages
