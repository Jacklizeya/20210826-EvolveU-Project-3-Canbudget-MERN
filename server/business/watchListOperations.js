const watchListDB = require('../models/watchList');
const userMap = require('./usersMapManipulations');

async function addUser(id){
    await userMapMan.addUser(id);   
}

async function removeUser(id){
    user = usersMap.getUser(id);
    await userDB.updateUserSecurities(id, user.balance, user.totalsum);
    userMap.removeUser(id);
}

async function addWatchList(id, symbol, period){
    user = usersMap.getUser(id);
    userMap.addWatchList(user, symbol, period);
    return watchList.add(id, symbol)
}

async function removeWatchList(id,  symbol){
    user = usersMap.getUser(id);
    userMapMan.removeWatchList(user,  symbol )
    return watchList.takeAway(id, symbol)
}


module.exports = {
    addUser,
    removeUser,
    addWatchList,
    removeWatchList
}