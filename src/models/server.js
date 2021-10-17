const http = require('http')
const cors = require('cors')
const express = require('express')
const socketio = require('socket.io')
const Sockets = require('./sockets')
const dbConnection = require('../db/config')

class Server {
  constructor() {
    // init express
    this.app = express()
    this.port = process.env.PORT ?? 8080

    // Conexion a la DB
    dbConnection()

    // Server and socket server
    this.server = http.createServer(this.app)
    this.io = socketio(this.server)

    // sockets events
    this.sockets = new Sockets(this.io)
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // ToJSON
    this.app.use(express.json())

    // Routers
    this.app.use('/api/auth', require('../router/auth'))
    this.app.use('/api/messages', require('../router/messages'))
  }

  start() {
    this.middlewares()
    this.sockets.events()
    this.server.listen(this.port, () => {
      console.log('Server running on port: ', this.port)
    })
  }
}

module.exports = Server
