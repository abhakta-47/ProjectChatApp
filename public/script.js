var socket = io();
var userId = prompt("Enter your User Name")
userId = ((userId === '') ? "Anonymous" : userId);
socket.emit("iAmNew", userId);
let txt_ = document.getElementById("ur-msg")
let chatArea = document.getElementById("chat-area-id")

colors = [{
        "primary": "#97CC04",
        "light": "#B2DB40",
        "dark": "#82af06"
    },
    {
        "primary": "#02B5EE",
        "light": "#5DCDF0",
        "dark": "#0A8CB6"
    },
    {
        "primary": "#EC1CD7",
        "light": "#E372D8",
        "dark": "#D30CC0"
    },
    {
        "primary": "#F3A917",
        "light": "#F1C163",
        "dark": "#E39B0B"
    },
    {
        "primary": "#6816BA",
        "light": "#8D51C9",
        "dark": "#7920D2"
    }
]

let random_ = Math.floor(Math.random() * (colors.length));
console.log(random_)
$(".logo").text(userId[0].toUpperCase());
$(".logo").css({
    "border-color": colors[random_].dark,
    "color": colors[random_].primary
});
$(".users-list").css("background-color", colors[random_].light);
$("header, footer").css("background-color", colors[random_].primary);

txt_.addEventListener("keyup", () => {
    if (event.keyCode === 13) {
        event.preventDefault()
        cout()
    }
});
let button_ = document.getElementById("send-button")
button_.addEventListener("click", () => cout())

// function chatWriter( obj ){
//     string s = " "
// }

function cout() {
    // console.log("pressed")
    console.log(txt_.value)
    // chatArea.innerHTML = (txt_.value)
    msgObj = {
        "user": userId,
        "msg": txt_.value,
        "color": random_
    };
    socket.emit('broad', msgObj)
    $("#chat-area-id").append("<div class=\"msg-box ur\"><div class=\"info ur\"><div class=\"logo\">" + msgObj["user"][0].toUpperCase() + "</div><div class=\"time\">" + msgObj["user"] + "</div></div><p class=\"msg\">" + msgObj["msg"] + "</p></div>")
    $("#chat-area-id .msg-box:last-child, #chat-area-id .msg-box:last-child .logo").css({
        "border-color": colors[msgObj.color].primary,
        "box-shadow": "5px 5px 10px " + colors[msgObj.color].primary
    });
    $("#chat-area-id .msg-box:last-child .info ").css({
        "color": colors[msgObj.color].primary
    });
    $("#chat-area-id .msg-box:last-child .info ").css({
        "border-bottom": "solid 0.1px " + colors[msgObj.color].primary,
        "border-radius": 0
    });
    txt_.value = ""
}

socket.on('recive-msg', (msgObj) => {
    $("#chat-area-id").append("<div class=\"msg-box other\"><div class=\"info other\"><div class=\"logo\">" + msgObj["user"][0].toUpperCase() + "</div><div class=\"time\">" + msgObj["user"] + "</div></div><p class=\"msg\">" + msgObj["msg"] + "</p></div>")
    $("#chat-area-id .msg-box:last-child, #chat-area-id .msg-box:last-child .logo").css({
        "border-color": colors[msgObj.color].primary,
        "box-shadow": "5px 5px 10px " + colors[msgObj.color].primary
    });
    $("#chat-area-id .msg-box:last-child .info ").css({
        "color": colors[msgObj.color].primary
    });
    $("#chat-area-id .msg-box:last-child .info ").css({
        "border-bottom": "solid 0.1px " + colors[msgObj.color].primary,
        "border-radius": 0
    });
});

socket.on("newUser", (id) => alert("New user connected : " + id))