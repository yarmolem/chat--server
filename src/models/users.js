const User = require('./user')

class Users {
  async setOnlineUser(uid, isOnline) {
    const user = await User.findById(uid)
    user.online = isOnline
    await user.save()

    if (isOnline) {
      console.log('CONNECTED_USER:', user.id)
    } else {
      console.log('DISCONNECTED_USER:', user.id)
    }
    return user
  }

  async getUsers() {
    const users = await User.find().sort('-online')
    return users
  }
}

module.exports = Users
