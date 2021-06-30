const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  symbol: {
    type: String,
    required: true,
    index:{ unique: false}
  },
  stock: String,
  name:  String,
  uname:{
    type: String,
    index:{ unique: false}
  },
  exchange: String
});

//stockSchema.index({symbol:'text', name:'text'});
const stockModel = mongoose.model('Stock', stockSchema, 'stocks');


/* #region Seed */

async function deleteAllStocks() {
  return stockModel.deleteMany({});
}

async function uploadStock(symbol, stock, name, exchange) {
  let uname = name.substring(0, 15).toUpperCase()
  return  stockModel.create({symbol, stock, name, uname, exchange});
}

/* #endregion */

async function getOneStock(symb){
  return stockModel.findOne({symbol:symb})
}

async function getSmrtList(symb){
  if ( !symb ||  symb===""){
    return [];
  }
  const uSymb = symb.toUpperCase();

  if (symb.length < 3){
    return  stockModel.find({symbol:uSymb});
  }
  return stockModel.find({$or: [ { symbol: new RegExp("^" +uSymb) },
    { uname: new RegExp("^" +uSymb)}
]}, 'symbol stock name');
}


module.exports = {deleteAllStocks,
                  uploadStock,
                  getOneStock, 
                  getSmrtList
}