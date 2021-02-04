const mongoose = require('mongoose');


var blogSchema = new mongoose.Schema({
    from: String,
    to: String,
    time: { type: Date, default: Date.now },
    msg: String
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    blog: [blogSchema]
});

const User = mongoose.model('account', UserSchema);
module.exports = User;