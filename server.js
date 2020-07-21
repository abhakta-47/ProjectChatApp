var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 8080;

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('/index.html')
});

var server = http.listen(PORT, () => {
    console.log("server started at....  *. " + PORT)
})

io.on('connect', function (socket) {
    socket.on("iAmNew", (userId) => {
        console.log(" ID: " + userId);
        socket.broadcast.emit('newUser', userId)
    });
    // socket.broadcast.emit("newUser", (socket.id).toString())
    console.log('a user has connected!');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('broad', (msg) => {
        console.log(msg + "   recieved");
        socket.broadcast.emit('recive-msg', msg);
    });
});