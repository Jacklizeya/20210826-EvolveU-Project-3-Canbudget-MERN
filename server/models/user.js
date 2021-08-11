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
    securitiesAccount: Number,
    valueOfSecurities: Number,
    cashFlow: Array,
    balanceSheet: Array,
    transaction: Array
});

const userModel = mongoose.model('User', userSchema, 'users')

// For user level

async function getUserList() {
    return userModel.find({});
}

async function createUser(newUser) {
        return userModel.create(newUser);
}

async function findById(id){
    try {
        return userModel.findById(id);      
    } catch (error) {
        console.error("error=", error);
    }
    return null;
}

async function checkLogin(email, password){
    try {
        return userModel.findOne({email, password}, 'userType');      
    } catch (error) {
        console.error("error=", error);
    }
    return null;
}

async function findByEmail(email){
    try {
        return userModel.find({email}, '');      
    } catch (error) {
        console.error("error=", error);
    }
    return null;
}

async function updateUserSecurities(id,securitiesAccount, valueOfSecurities){
    if (valueOfSecurities >=0){       
        return userModel.findByIdAndUpdate(id,{securitiesAccount,valueOfSecurities} );
    }else{
        return userModel.findByIdAndUpdate(id,{securitiesAccount} );
    }
}


async function getSecuritiesAccocunt(id){
   return userModel.findById(id,"securitiesAccount , valueOfSecurities" );
}


async function updateUser(updClient) {
    return userModel.findByIdAndUpdate(updClient._id, updClient,{new:true});                   
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


// For Transactions add one by one I donot really use this one, the below one is way more efficient
// async function addTransaction(userId, newTransaction) {
  
//     console.log("going to add something")
//     return userModel.updateOne(
//         { _id: userId },
//         { $push: { transaction: newTransaction } }
//     )
// }


// I want to try to add a whole
async function addTransaction(userId, newTransactionArray) {
    console.log("going to add something")
    return userModel.updateOne(
        { _id: userId },
        { $push: { transaction: {$each: newTransactionArray} } }
    )
}

module.exports = {
    createUser,
    getUserList,
    findById, 
    checkLogin,
    findByEmail,
    updateUser,
    updateUserSecurities,
    getSecuritiesAccocunt,
    removeCashFlow,
    addBalanceSheet,
    removeBalanceSheet,
    addTransaction
}