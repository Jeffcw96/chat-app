const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    friends: {
        type: Array
    },
    bio: {
        type: String,
    },
    picture: {
        type: String
    }
})

module.exports = mongoose.model('user', UserSchema)