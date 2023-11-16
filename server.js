const { createServer } = require('node:http');
const { Server } = require('socket.io')

const api = require('./api')
const sockets = require('./sockets')

const httpServer = createServer(api)
const socketServer = new Server(httpServer)

httpServer.listen(3000, () => {
    console.log('listening on port: 3000')
})

sockets.listen(socketServer)
