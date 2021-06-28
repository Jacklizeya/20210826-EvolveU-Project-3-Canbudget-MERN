const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

// data schema
const userSchema = new Schema({
    userName: {
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


module.exports = {
    createUser,
    getUserList,
    findById, 
    checkLogin
}