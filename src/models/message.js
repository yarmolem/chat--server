const { Schema, model } = require('mongoose')

const MessageSchema = Schema(
  {
    from: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId
    },
    to: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

MessageSchema.method('toJSON', function () {
  const { __v, ...mensaje } = this.toObject()
  return mensaje
})

module.exports = model('Message', MessageSchema)
