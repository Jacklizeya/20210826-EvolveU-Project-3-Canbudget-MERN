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

async function addCashFlow(userId, newCashFlow) {

    // does it already in the database? if yes, delete then add, if not, just add
    let duplicateOrNot =  await userModel.find(
        { _id: userId },
        {cashFlow : {$elemMatch : {name: newCashFlow.name}}}
         
    )

    console.log("*******duplicatedornot", duplicateOrNot[0].cashFlow)

    if (duplicateOrNot[0].cashFlow) { await userModel.updateOne(
        { _id: userId },
        { $pull: { cashFlow: {name: newCashFlow.name} } }
    )}

    
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

async function addBalanceSheet(userId, newBaddBalanceSheet) {

    // does it already in the database? if yes, delete then add, if not, just add
    let duplicateOrNot =  await userModel.find(
        { _id: userId },
        {balanceSheet : {$elemMatch : {name: newBaddBalanceSheet.name}}}
         
    )

    console.log("*******duplicatedornot", duplicateOrNot[0].balanceSheet)

    if (duplicateOrNot[0].balanceSheet) { await userModel.updateOne(
        { _id: userId },
        { $pull: { balanceSheet: {name: newBaddBalanceSheet.name} } }
    )}

    
    return userModel.updateOne(
        { _id: userId },
        { $push: { balanceSheet: newBaddBalanceSheet } }
    )
}


function removeBalanceSheet(userId, nameOfItemToRemove) {
    console.log(userId, nameOfItemToRemove)
    return userModel.updateOne(
        { _id: userId },
        { $pull: { balanceSheet: {name: nameOfItemToRemove} } }
    )
}

module.exports = {
    createUser,
    getUserList,
    addCashFlow,
    removeCashFlow,
    addBalanceSheet,
    removeBalanceSheet
}