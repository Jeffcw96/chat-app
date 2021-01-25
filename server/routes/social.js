const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Chat = require('../models/Chat');
const mongoose = require('mongoose');

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

router.post('/request', auth, async (req, res) => {
    try {
        console.log("request friend");
        const { searchParam } = req.body;
        const isEmail = emailIsValid(searchParam);

        let user

        if (isEmail) {
            user = await User.findOneAndUpdate({ email: searchParam }, { $addToSet: { request: req.user.id } })
        } else {
            user = await User.findById({ _id: searchParam }, { $addToSet: { request: req.user.id } })
        }

        if (!user) {
            res.status(404).json({ error: "User Not Found" })
            return
        }

        res.json({ status: "OK" })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" })
    }
})


router.post('/add', auth, async (req, res) => {
    try {
        console.log("add friend");
        const chat = {};
        const { senderId } = req.body;
        const receiverId = req.user.id
        // let Ids = [];
        // Ids.push(mongoose.Types.ObjectId(senderId));
        // Ids.push(mongoose.Types.ObjectId(receiverId));

        let senderChat = {}
        let receiverChat = {}

        senderChat.user = receiverId;
        senderChat.type = "individual";

        receiverChat.user = senderId;
        receiverChat.type = "individual";

        let users = []
        users.push(senderId);
        users.push(receiverId);

        chat.users = users;
        const chatDB = new Chat(chat);
        await chatDB.save()

        senderChat.ticket = chatDB.id;
        receiverChat.ticket = chatDB.id;

        //delete the record in request list when user has accept the friend request
        await User.findByIdAndUpdate({ _id: receiverId }, { $pull: { request: senderId }, $addToSet: { friends: senderId, chatTicket: receiverChat } })
        //await User.updateMany({ _id: { $in: Ids } }, { $addToSet: { chatTicket: chatDB.id } })
        await User.findByIdAndUpdate({ _id: senderId }, { $addToSet: { friends: receiverId, chatTicket: senderChat } })

        res.send("OK")
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" })
    }

})

router.get('/show', auth, async (req, res) => {
    try {
        console.log("list friend")
        const user = await User.findById({ _id: req.user.id });
        res.json(user.friends);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" })
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        console.log('delete friend');
        const { id } = req.body
        await User.findByIdAndUpdate({ _id: req.user.id }, { $pull: { friends: { id: id } } })
        res.send("ok")
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" })
    }
})

router.post('/list', auth, async (req, res) => {
    try {
        const ids = req.body.ids
        let users = []
        for (let id of ids) {
            let user = await User.findById(id).select("-password -friends -request");
            console.log("user before", user)
            user.chatTicket = user.chatTicket.find(chat => {
                return chat.user === req.user.id
            })
            console.log("user after", user)
            users.push(user)
        }
        res.json({ users: users })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" })
    }
})

module.exports = router