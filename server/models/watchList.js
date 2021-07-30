const mongoose = require('mongoose');

require('./db')
const stockDB = require("./stock");

const Schema = mongoose.Schema;

const watchListSchema = new Schema({
    client: mongoose.ObjectId,
    symbol: String,
    period: String
});

const watchListModel = mongoose.model('WatchList', watchListSchema, 'watchLists')

async function getWatchList(id){
    return watchListModel.find({client:id});
}

async function add(id, symbol, period){
 
    // const stock =await stockDB.getOneStock(symbol);
    // if (stock==null){
    //     return {ok:false};
    //  }
   
    // result = await watchListModel.findOne({client:id,symbol} );
    // if (result !=null) {
    //     if (result.period !== period){
        return watchListModel.findOneAndUpdate({client:id,symbol},{period},{new:true, upsert:true});
    //     }
    //     return {ok:true};    
    // }   
    // return await watchListModel.create({client:id, symbol,period});
}


async function takeAway(id, symbol){
    return watchListModel.deleteMany({client:id, symbol});
}


module.exports = {
    watchListModel,
    getWatchList,
    add,
    takeAway
}