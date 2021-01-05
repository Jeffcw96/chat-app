const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/add', auth, async (req, res) => {
    try {
        console.log("add friend");
        const friend = {};
        const { email, id } = req.body
        if (email === "" && id === "") {
            res.status(404).json({ error: "User Not Found" })
        }

        let user
        if (email !== "") {
            user = await User.findOne({ email });

        } else if (id !== "") {
            user = await User.findById({ _id: id });

        }

        if (!user) {
            res.status(404).json({ error: "User Not Found" })
        }

        friend.name = user.name;
        friend.id = user.id;
        friend.email = user.email;
        friend.picture = user.picture;

        await User.findByIdAndUpdate({ _id: req.user.id }, { $push: { friends: friend } })
        res.send("ok")
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