const e = require('express');
const watchListDB = require('../models/watchList');
const usersMap = require('./usersMapManipulations');

async function addUser(id){
    await usersMap.addUser(id);   
}

async function removeUser(id){
    user = usersMap.getUser(id);
    await userDB.updateUserSecurities(id, user.balance, user.totalsum);
    usersMap.removeUser(id);
}

async function addWatchList(id, symbol, period){
    user = usersMap.getUser(id);
    usersMap.addWatchList(user, symbol, period);
    return watchListDB.add(id, symbol, period)
}

async function removeWatchList(id,  symbol){
    user = usersMap.getUser(id);
    usersMap.removeWatchList(user,  symbol )
    return watchListDB.takeAway(id, symbol)
}


module.exports = {
    addUser,
    removeUser,
    addWatchList,
    removeWatchList
}