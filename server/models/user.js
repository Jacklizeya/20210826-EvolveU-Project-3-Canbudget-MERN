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

// For user level

function getUserList() {
    return userModel.find({});
}


function createUser(newUser) {
    return userModel.create(newUser);
}

// For Cash Flow

function addCashFlow(userId, newCashFlow) {
    return userModel.updateOne(
        { _id: userId },
        { $push: { cashFlow: newCashFlow } }
    )
}


function removeCashFlow(userId, nameOfItemToRemove) {
    console.log(userId, nameOfItemToRemove)
    return userModel.updateOne(
        { _id: userId },
        { $pull: { cashFlow: {name: nameOfItemToRemove} } }
    )
}

// For Balance Sheet

function addBalanceSheet(userId, newBalanceSheet) {
    return userModel.updateOne(
        { _id: userId },
        { $push: { balanceSheet: newBalanceSheet } }
    )
}

module.exports = {
    createUser,
    getUserList,
    addCashFlow,
    removeCashFlow,
    addBalanceSheet,
}