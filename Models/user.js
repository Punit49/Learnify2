const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/LearnifyUsers');

const userSchema = mongoose.Schema({
    username: String,
    fullname: String,
    email: String,
    password: String,
    profilepic: {
        type: String,
        default: "default.png"
    }
});

module.exports = mongoose.model('userSchema', userSchema);