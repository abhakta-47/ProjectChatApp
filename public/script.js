var socket = io();
var userId = prompt("Enter your User Name")
let txt_ = document.getElementById("ur-msg")
let chatArea = document.getElementById("chat-area-id")

$(".logo").text(userId[0]);

txt_.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        event.preventDefault()
        cout()
    }
})
let button_ = document.getElementById("send-button")
button_.addEventListener("click", () => cout())

// function chatWriter( obj ){
//     string s = " "
// }

function cout() {
    // console.log("pressed")
    console.log(txt_.value)
    // chatArea.innerHTML = (txt_.value)
    socket.emit('broad', {
        "user": userId,
        "msg": txt_.value
    })
    $("#chat-area-id").append(" <div class=\"chat-box ur\">    <div class=\"info ur\">        <div class=\"logo\">"+ userId[0] +"</div>        <div class=\"time\">"+""+"</div></div><p class=\"msg\">" + txt_.value+ "</p></div>")
}

socket.on('recive-msg', (msgObj) => {
    $("#chat-area-id").append("<div class=\"chat-box other\"><div class=\"info other\"><div class=\"logo\">"+msgObj["user"][0]+"</div><div class=\"time\"></div></div><p class=\"msg\">"+msgObj["msg"]+"</p></div>")
});