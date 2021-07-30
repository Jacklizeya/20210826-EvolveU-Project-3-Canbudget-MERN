const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    client: mongoose.ObjectId,
    symbol: String,
    amount: Number
});

const portfolioModel = mongoose.model('Portfolio', portfolioSchema, 'portfolios')


async function getPortfolio(id){
    return portfolioModel.find({client:id});
}

async function add(id, symbol, amount)
{
    result = await portfolioModel.findOne({client:id,symbol} );
    if (result ==null){
        result ={client:id, symbol, amount};

    }else{ 
          result.amount += amount;
    }
   return  portfolioModel.updateOne({client:id, symbol}, result, {new:true, upsert:true});
}

async function takeAway(id, symbol, amount){
    result = await portfolioModel.findOne({client:id,symbol} );
    if (result !=null){
          result.amount -= amount;
          if (result.amount <= 0){
            return portfolioModel.deleteOne({client:id, symbol});
          }else{
            return portfolioModel.updateOne({client:id, symbol}, result, {new:true, upsert:true});
          }
    }
    return null;
}

async function getAmount(id, symbol){
    result = await portfolioModel.findOne({client:id,symbol} );
    return (result ==null) ? 0 : result.amount;
}

module.exports = {
    portfolioModel,
    getPortfolio,
    takeAway,
    add,
    getAmount
}