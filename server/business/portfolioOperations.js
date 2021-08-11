const portfolioDB = require('../models/portfolio');
const settingDB = require('../models/settings')
const userDB = require('../models/user')
const usersMap = require('./usersMapManipulations');

async function buy(id, symbol, price, amount) {
    if (price <= 0) {
        return { ok: false, message: "Price is unknown" };
    }
  
    let userM = usersMap.getUser(id);

    //let user = await userDB.getSecuritiesAccocunt(id)
    let company = await settingDB.getSetting()
    if (!user || !company) {
        return { ok: false, message: "Server error - client lost" };
    }
    let balance = userM.balance;
    const delta = amount * price + company.commission;
    if (delta > balance) {
        return { ok: false, message: "Not enoupgh money to buy this stock" };
    }

    let newBalance = balance - delta;
    await userDB.updateUserSecurities(id, newBalance,-1);
    await portfolioDB.add(id, symbol, amount);
    
    usersMap.addPortfolio(userM, symbol, amount);
    usersMap.setAccountBalance(userM,newBalance, -1);

    return { ok: true, message: "" };
 
}

async function sell(id, symbol, price, amount) {
    // const stock =await stockDB.getOneStock(symbol);
    // if (stock==null){
    //     return {ok:false, message:"Server error - no such stock"};
    // }
    if (price <= 0) {
        return { ok: false, message: "Price is unknown" };
    }

//    let user = await userDB.getSecuritiesAccocunt(id)
    let userM = usersMap.getUser(id);

    let company = await settingDB.getSetting()
    if (!user || !company) {
        return { ok: false, message: "Server error - client lost" };
    }
    
    let balance = userM.balance;
    //let balance = user.securitiesAccount;

    if (!balance || !company) {
        return { ok: false, message: "Server error - client lost" };
    }
    let amountNow = await portfolioDB.getAmount(id, symbol);
    if (amount > amountNow) {
        amount = amountNow;
    }

    const delta = (amount * price - company.commission);

    let newBalance = balance + delta;
    await userDB.updateUserSecurities(id, newBalance,-1);
    await portfolioDB.takeAway(id, symbol, amount);
 
    usersMap.removePortfolio(userM, symbol, amount);
    usersMap.setAccountBalance(userM,newBalance, -1);

    return { ok: true, message: "" };
}


module.exports = {
    buy,
    sell
}