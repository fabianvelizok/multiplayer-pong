const http = require('node:http');
const path = require('node:path')
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

let readyPlayers = 0

io.on('connection', (socket) => {
    socket.on('ready', () => {
        console.log('Player ready', socket.id)
        readyPlayers++

        if (readyPlayers === 2) {
            io.emit('startGame', socket.id)
        }
    })

    socket.on('paddleMove', ({ xPosition }) => {
        socket.broadcast.emit('paddleMove', { xPosition })
    })

    socket.on('ballMove', ballData => {
        socket.broadcast.emit('ballMove', ballData)
    })
});
