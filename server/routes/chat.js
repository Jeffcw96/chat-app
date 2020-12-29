exports = module.exports = function (io) {
    io.on('join', ({ username, occupation }, callback) => {
        console.log("username", username, "occupation", occupation);
        io.to('some room').emit('some event');
        io.join()
    });

    io.on('sendMessage', (msg) => {
        console.log("receive message, ready to send to front end")
        console.log("msg", msg);
        io.emit('message', msg)
    })
}