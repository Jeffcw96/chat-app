const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/main');
const DB = require('./routes/db');
require('dotenv').config()

DB();

const app = express();
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(router);
app.use("/auth", require('./routes/auth'));
app.use("/social", require('./routes/social'));
app.use("/user", require('./routes/user'));

app.post("/testing", (req, res) => {
    console.log("body", req.body);
    res.send("API OK");
})

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    let timer = null
    socket.emit('messageshaha', 'Welcome to the CHAT APP');
    socket.on('sendMessage', ({ msg, room }) => {
        console.log("receive message, ready to send to front end")
        console.log("msg", msg);
        io.to(room).emit('message', msg);
    })

    socket.on('join', ({ chatTicket, host, receiver }, callback) => {
        // let i = 0;
        // timer = setInterval(() => {
        //     i++
        //     console.log(i + "seconds");
        // }, 1000)

        console.log("chatTicket", chatTicket, "host", host, "receiver", receiver);
        socket.broadcast.emit('userJoin', `${host} has joined the chat`);
        socket.join(chatTicket)
    });

    // Listen for new messages
    socket.on('testing', (data) => {
        io.in(room).emit('testing', data);
    });

    socket.on('disconnect', () => {
        // clearInterval(timer)
        console.log("disconnected");
    })
});


server.listen(process.env.PORT || 5000, () => console.log(`Server has started. at PORT 5000`));