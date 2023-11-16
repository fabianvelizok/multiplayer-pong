let readyPlayers = 0

function listen(io) {
    const pongNamespace = io.of('/pong')
    let room = ''

    pongNamespace.on('connection', (socket) => {
        socket.on('ready', () => {
            room = `room-${Math.floor(readyPlayers / 2)}`
            console.log(`Player ready: ${socket.id}. Room: ${room}`)
            socket.join(room)
            readyPlayers++

            if (readyPlayers % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id)
            }
        })

        socket.on('paddleMove', ({ xPosition }) => {
            socket.to(room).emit('paddleMove', { xPosition })
        })

        socket.on('ballMove', ballData => {
            socket.to(room).emit('ballMove', ballData)
        })

        socket.on('disconnect', reason => {
            console.log(`Player disconnected: ${socket.id}. Reason: ${reason}`)
            socket.leave(room)
        })
    });
}

module.exports = {
    listen
}
