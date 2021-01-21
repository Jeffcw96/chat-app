const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Chat = require('../models/Chat')

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

router.post('/request', auth, async (req, res) => {
    try {
        const { searchParam } = req.body;
        const isEmail = emailIsValid(searchParam);

        let user

        if (isEmail) {
            user = await User.findOneAndUpdate({ email: searchParam }, { $push: { request: req.user.id } })
        } else {
            user = await User.findById({ _id: searchParam }, { $push: { request: req.user.id } })
        }

        if (!user) {
            res.status(404).json({ error: "User Not Found" })
            return
        }



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

        let users = []
        users.push(senderId);
        users.push(receiverId);

        chat.users = users;
        const chatDB = new Chat(chat);
        const { _id } = chatDB.save()

        //delete the record in request list when user has accept the friend request
        await User.findByIdAndUpdate({ _id: receiverId }, { $pull: { request: { id: senderId } } })

        /*To Do
            - Update both user id in both friends attribute
            - assign chat id in both user id
        */
        // await User.findByIdAndUpdate({ _id: req.user.id }, { $push: { friends: friend } })
        res.send({ status: "Success" })
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

module.exports = router