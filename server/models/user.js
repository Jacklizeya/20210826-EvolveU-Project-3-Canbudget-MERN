const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

// data schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: String,
    address: String,
    email: {
        type: String,
        required: true
    },
    phoneNumber: String,
    userType: String,
    cashFlow: Array,
    balanceSheet: Array
});

const userModel = mongoose.model('User', userSchema, 'users')


async function getUserList() {
    return userModel.find({});
}

async function createUser(newUser) {
    return userModel.create(newUser);
}

function addCashFlow(userId, newCashFlow) {
    return userModel.updateOne(
        { _id: userId },
        { $push: { cashFlow: newCashFlow } }
    )
}

module.exports = {
    createUser,
    getUserList,
    addCashFlow
}