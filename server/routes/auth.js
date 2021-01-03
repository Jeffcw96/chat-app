const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/register', [check('email', 'Please enter a valid email').isEmail(),
check('password', 'Please enter at least 6 characters').isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        console.log("errors", errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const user = {}
        const { email, password } = req.body

        try {
            const salt = await bcrypt.genSalt(1);
            user.email = email;
            user.password = await bcrypt.hash(password, salt);

            const userDB = new User(user);
            await userDB.save()

            res.json({ status: 'Successful' });
        } catch (error) {
            console.error(error.message);
            res.status(400).json({ error: 'DB error' })
        }
    })

router.post('/login', [check('email', 'Please enter a valid email').isEmail(),
check('password', 'Please enter at least 6 characters').isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() })
        }

        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email })

            if (!user) {
                res.status(400).json({ error: "Invalid Credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, process.env.TOKEN, { expiresIn: 60 * 60 * 24 * 1 }, (err, token) => {
                if (err) throw (err);
                res.json({ token })
            })

        } catch (error) {
            console.error(error.message);
            res.status(400).json({ error: 'DB error' })
        }
    })

module.exports = router;