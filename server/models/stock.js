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
  name: String,
  exchange: String
});

const stockModel = mongoose.model('Stock', stockSchema, 'stocks');

async function deleteAllStocks() {
  return stockModel.deleteMany({});
}

async function uploadStock(symbol, stock, name, exchange) {
  return  stockModel.create({symbol, stock, name, exchange});
}

async function getOneStock(symb){
  return stockModel.findOne({symbol:symb})
}

module.exports = {deleteAllStocks,
                  uploadStock,
                  getOneStock
}