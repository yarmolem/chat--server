class Sockets {
  constructor(io) {
    this.io = io
  }

  events() {
    this.io.on('connection', (socket) => {
      console.log('ID:', socket.id)
    })
  }
}

module.exports = Sockets
