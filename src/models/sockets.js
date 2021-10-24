const Users = require('./users')
const Messages = require('./messages')
const { verifyJWT } = require('../utils/jwt')
const { GET_USERS, EMIT_MESSAGE } = require('../types')

class Sockets {
  constructor(io) {
    this.io = io
    this.users = new Users()
    this.messages = new Messages()
  }

  events() {
    this.io.on('connection', async (socket) => {
      const token = socket.handshake.query['x-token']
      const [valid, uid] = verifyJWT(token)

      if (!valid) {
        console.log('ERROR_SOCKET_NO_AUTH')
        return socket.disconnect()
      }

      // Modifico en la DB en campo online para que aparezca conectado
      await this.users.setOnlineUser(uid, true)
      // Lo conectado a una sala
      socket.join(uid)
      // Emito a todos los usuarios la lista actualizada de usuarios
      this.io.emit(GET_USERS, { users: await this.users.getUsers() })
      // Escucho si hay mensajes p2p y los guardo en al DB
      socket.on(EMIT_MESSAGE, async (msg) => {
        const message = await this.messages.saveMessage(msg)
        this.io.to(msg.to).emit(EMIT_MESSAGE, { message })
        this.io.to(msg.from).emit(EMIT_MESSAGE, { message })
      })

      // Si se desconecta del socket server modifico el campo online
      socket.on('disconnect', async () => {
        await this.users.setOnlineUser(uid, false)
        this.io.emit(GET_USERS, { users: await this.users.getUsers() })
      })
    })
  }
}

module.exports = Sockets
