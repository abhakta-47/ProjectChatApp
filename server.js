var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('/index.html')
});

var server = http.listen(PORT, () => {
    console.log("server started .... 8080")
})

io.on('connection', function (socket) {
    console.log('a user has connected!');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('broad', (msg) => {
        console.log(msg + "   recieved");
        socket.broadcast.emit('recive-msg', msg);
    });
});




// io.on(‘connection’, function (socket) {
//     console.log(‘a user has connected!’);

//     socket.on(‘disconnect’, function () {
//         console.log(‘user disconnected’);
//     });


//     socket.on(‘upvote - event’, function (upvote_flag) {
//         console.log(‘upvote: ‘+upvote_flag);
//     });
// });