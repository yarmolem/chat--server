const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  }
})

UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...user } = this.toObject()
  user.uid = _id
  return user
})

module.exports = model('User', UserSchema)
