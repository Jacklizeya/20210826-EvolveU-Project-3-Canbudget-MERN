const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    eMail: {
        type: String,
        required: true
    },
    phone: String,
    password: String,
    role: Number
});

const userModel = mongoose.model('User', userSchema, 'users')


async function createUser(newUser) {
    return userModel.create(newUser);
}

async function getUserList() {
    return userModel.find({} ).sort({ lastName: 1, firstName: 1 }).exec();
}


module.exports = {
    createUser,
    getUserList
}