const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/main');

const app = express();
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

app.post("/testing", (req, res) => {
    console.log("body", req.body);
    res.send("API OK");
})

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("hahaha")
    socket.emit('messageshaha', 'Welcome to the CHAT APP');
    socket.broadcast.emit('userJoin', 'A user has joined the chat');
    socket.on('sendMessage', ({ msg, room }) => {
        console.log("receive message, ready to send to front end")
        console.log("msg", msg);
        io.to(room).emit('message', msg);
    })

    socket.on('join', ({ username, occupation, room }, callback) => {
        console.log("username", username, "occupation", occupation);
        socket.join(room)
    });

    // Listen for new messages
    socket.on('testing', (data) => {
        io.in(room).emit('testing', data);
    });

    socket.on('disconnect', () => {
        console.log("disconnected");
    })
});


server.listen(process.env.PORT || 5000, () => console.log(`Server has started. at PORT 5000`));