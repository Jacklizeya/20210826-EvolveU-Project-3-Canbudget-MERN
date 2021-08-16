const watchListDB = require('../models/watchList');
const portfolioDB = require('../models/portfolio');
const userDB = require('../models/user');

const users = new Map();
const cacheData = new Map();

function getUser(id){
    if( !users.has(id) ){
        users.set(id, {stocks: new Map(), balance: 0, totalSum:0}) ;
    }
    return users.get(id);
}

function createEmptyStockObj(){
    return { portfolioAmount: 0, watchlist: false , period:0};
}

function addPortfolio(user,  symbol, amount) {
    let stock = user.stocks.has(symbol) ? user.stocks.get(symbol) : createEmptyStockObj();
    stock.portfolioAmount += amount;
    user.stocks.set(symbol, stock)
}

function removePortfolio(user,  symbol, amount) {
    let stock = user.stocks.get(symbol);
    if (!stock ) return;
    stock.portfolioAmount -= amount;
    if (stock.portfolioAmount < 0) {stock.portfolioAmount=0}
    if (stock.portfolioAmount > 0 || stock.watchlist) {
        return;
    } else {
        stocks.delete(symbol);
    }
}
function getAmount(user,  symbol){
    return  (user.stocks.has(symbol)) ?
    user.stocks.get(symbol).portfolioAmount :
            0;
}

function setAccountBalance(user, balance, valueOfSecurities){
    user.balance = balance;
    if (valueOfSecurities >= 0){
        user.totalSum = valueOfSecurities;
    }
}

function addWatchList(user,  symbol, period) {
    let stock = user.stocks.has(symbol) ? user.stocks.get(symbol) : createEmptyStockObj();
    stock.watchlist = true;
    stock.period = period;
    user.stocks.set(symbol, stock)
}

function removeWatchList(user,  symbol) {
    let stock = user.stocks.get(symbol);
    if (!stock ) return;
    stock.watchlist = false;
    if (stock.portfolioAmount > 0 || stock.watchlist) {
        return;
    } else {
        user.stocks.delete(symbol);
    }
}


// function addPortfolioOrWatchList(id, symbol, period, isPortfolio) {
//     let user = users.has(id) ? users.get(id) : { stocks: new Map(), balance: 0 };
//     let stock = user.stocks.has(symbol) ? user.stocks.get(symbol) : { portfolio: false, watchlist: false , period:0};
//     if (isPortfolio) {
//         stock.portfolio = true;
//     } else {
//         stock.watchlist = true;
//         stock.period = period;
//     }
//     user.stocks.set(symbol, stock)
//     users.set(id, user);
// }

// function removePortfolioOrWatchList(id, symbol, isPortfolio) {
//     if (!users.has(id)) { console.error("removePortfoliOrWatchList 1 error ", id); return; }
//     let user = users.get(id);

//     if (!user.stocks.has(symbol)) { console.error("removePortfolioOrWatchList 2 error ", id, symbol); return; }

//     let stock = user.stocks.get(symbol);
//     if (isPortfolio) {
//         stock.portfolio = false;
//     } else {
//         stock.watchlist = false;
//     }

//     if (stock.portfolio || stock.watchlist) {
//         return;
//     } else {
//         stocks.delete(symbol);
//     }
// }

// async function addUser(id) {
//     let userFetchList = new Map ();

//     const watchList = watchListDB.getWatchList(id);
//     const portfolio = portfolioDB.getPortfolio(id);

//     let values = await Promise.all([watchList, portfolio]);
//     for (const val of values[0]) {
//         addPortfolioOrWatchList(id, val.symbol, val.period, false);
//         userFetchList.add({symbol:val.symbol, period:val.period})
//     }
//     for (const val of values[1]) {
//         addPortfolioOrWatchList(id, val.symbol, true);
//         if (!userFetchList.has(val.symbol)){
//              userFetchList.add({symbol:val.symbol, period:0})
//         }
//     }
//     return userFetchList;
// }


async function addUser(id) {
    if ( users.has(id)) return  users.get(id);

    let user =  getUser(id);

    const watchList = watchListDB.getWatchList(id);
    const portfolio = portfolioDB.getPortfolio(id);
    const securities =userDB.getSecuritiesAccocunt(id);
    let values = await Promise.all([watchList, portfolio,securities]);
    for (const val of values[0]) {
        addWatchList(user,  val.symbol, val.period) 
    }
    for (const val of values[1]) {
        addPortfolio(user,  val.symbol, val.amount) 
    }
    if ( values[2]){
        user.balance =  values[2].securitiesAccount;
        user.totalSum = values[2].valueOfSecurities;
    }else{
        user.balance = 0;
        user.totalSum = 0;
    }

    return user;
}



function removeUser(id) {
    users.delete(id);
}

function getSymbolsSet() {
    let symbList = new Set();
    for (let user of users.values()) {
        for (let symbol of user.stocks.keys()) {
            if (!symbList.has(symbol)) {
                symbList.add(symbol);
            }
        }
    }
    return symbList;
}


function getCompaniesSet(user) {
    let symbList = new Set();
    for (let [symbol, pw] of user.stocks) {
        // console.log(" not added symbol yet", symbol, pw)
        if (pw.watchlist) {
            symbList.add(symbol);
        }
    }
    return symbList;
}

function getCacheData(symbol) {
    return cacheData.has(symbol) ? cacheData.get(symbol) : null;
}

module.exports = {
    users,
    getUser,
    addPortfolio,
    removePortfolio,
    getAmount,
    addWatchList,
    removeWatchList,
    setAccountBalance,
    addUser,
    removeUser,
    getSymbolsSet,
    getCompaniesSet,
    getCacheData
}