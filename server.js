const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {
    v4: uuidv4
} = require('uuid')



const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
});

app.get('/:room', (req, res) => {
    res.render('room', {
        roomId: req.params.room
    })
})

var server = http.listen(PORT, () => {
    console.log("server started at....  *. " + PORT)
})

io.on('connect', function (socket) {
    socket.on("iAmNew", (recievedObj) => {
        console.log(" ID: " + recievedObj.userId);
        socket.join(recievedObj.roomId)
        socket.to(recievedObj.roomId).broadcast.emit('newUser', recievedObj.userId)
        socket.on('broad', (msg) => {
            console.log(msg + "   recieved");
            socket.to(recievedObj.roomId).broadcast.emit('recive-msg', msg);
            console.log(recievedObj.roomId)
        });
    });
    // socket.broadcast.emit("newUser", (socket.id).toString())
    console.log('a user has connected!');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

});