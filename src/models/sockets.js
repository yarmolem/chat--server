const { verifyJWT } = require('../utils/jwt')

class Sockets {
  constructor(io) {
    this.io = io
  }

  events() {
    this.io.on('connection', (socket) => {
      const token = socket.handshake.query['x-token']
      const [valid, uid] = verifyJWT(token)

      if (!valid) {
        console.log('ERROR_SOCKET_NO_AUTH')
        return socket.disconnect()
      }

      console.log('CONNECTED_ID:', uid)

      socket.on('disconnect', () => {
        console.log('DISCONNECTED_ID:', uid)
      })
    })
  }
}

module.exports = Sockets
