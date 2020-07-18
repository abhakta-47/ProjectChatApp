var socket = io();



let txt_ = document.getElementById("ur-msg")
let chatArea = document.getElementById("chat-area-id")

txt_.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        event.preventDefault()
        cout()
    }
})
let button_ = document.getElementById("send-button")
button_.addEventListener("click", () => cout())

function cout() {
    // console.log("pressed")
    console.log(txt_.value)
    // chatArea.innerHTML = (txt_.value)
    socket.emit('broad', txt_.value)
    $("#chat-area-id").append("<div class=\"ur-chat-box\" >" + txt_.value + "</div>")
}

socket.on('recive-msg', (msg) => {
    $("#chat-area-id").append("<div class=\"other-chat-box\" >" + msg + "</div>")
});