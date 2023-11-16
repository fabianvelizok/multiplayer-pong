let readyPlayers = 0

function listen(io) {
    io.on('connection', (socket) => {
        socket.on('ready', () => {
            console.log(`Player ready: ${socket.id}`)
            readyPlayers++

            if (readyPlayers % 2 === 0) {
                io.emit('startGame', socket.id)
            }
        })

        socket.on('paddleMove', ({ xPosition }) => {
            socket.broadcast.emit('paddleMove', { xPosition })
        })

        socket.on('ballMove', ballData => {
            socket.broadcast.emit('ballMove', ballData)
        })

        socket.on('disconnect', reason => {
            console.log(`Player disconnected: ${socket.id}. Reason: ${reason}`)
        })
    });
}

module.exports = {
    listen
}
