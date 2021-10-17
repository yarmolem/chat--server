const { Schema, model } = require('mongoose')

const MensajeSchema = Schema(
  {
    from: {
      ref: 'Usuario',
      required: true,
      type: Schema.Types.ObjectId
    },
    to: {
      ref: 'Usuario',
      required: true,
      type: Schema.Types.ObjectId
    },
    mensaje: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

MensajeSchema.method('toJSON', function () {
  const { __v, ...mensaje } = this.toObject()
  return mensaje
})

module.exports = model('Mensaje', MensajeSchema)
