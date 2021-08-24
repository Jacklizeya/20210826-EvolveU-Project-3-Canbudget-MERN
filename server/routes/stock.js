const express = require('express');
const stockDB = require('../models/stock');
const watchListOperations = require('../business/watchListOperations');
const portfolioOperations = require('../business/portfolioOperations');
const fetchData = require('../business/fetchData');

let router = express.Router();



router.get('/search/:stock', async (req, res) => {
  try {
      let stock = req.params.stock;
      console.log("search started "+stock)
      let data = await stockDB.getSmrtList(stock);
      if (data ){
          res.send({data});
      }
      else{
          res.sendStatus(500).send("Can't find stocks");
      }

  } catch (error) {
      res.sendStatus(500).send("Error finding stocks");       
  }
})


router.get('/:id/:full', async (req, res) => {
  const id = req.params.id;
  const full = req.params.full === 'true'
  //console.info(`fetch Stock ` + full);
  console.log("Stocks data fetched !")
  data = await fetchData.getDataForUser(id, full);
  if (data == null) {
    console.log(id + " Client not found");
    res.sendStatus(500);
  }
  else {
    res.send(data);
  }
});



router.post('/:id/watch', async (req, res) => {
  try {
    console.log("watcH")
    const id = req.params.id;
    const action = req.body;
    const symbol = action.symbol;
    const operation = action.operation;
    const period = action.period;
    switch (operation) {
      case "add":
        let data = await watchListOperations.addWatchList(id, symbol, period);
          // console.log("data=",data)  ;
        res.send(data);
        break;

      case "takeAway":
        res.send(await watchListOperations.removeWatchList(id, symbol));
        break;

      default:
        const s = "Unknown watch action: " + operation;
        console.error(s);
        res.status(400).send(s);
        break;
    }
  }
  catch (error) {
    const s = "Watching action error: " + error;
    console.error(s);
    res.status(500).send(s);
  }
})


router.post('/:id/portfolio', async (req, res) => {
  try {
    const id = req.params.id;
    const action = req.body;

    //console.log("portfolio");
    //console.log(action);
    
    const symbol = action.symbol;
    const operation = action.operation;
    const amount = action.amount;
    const price = action.price;

    if (operation === "buy" || operation === "sell") {
      console.log("Portfolio ",operation);
      const { ok, message } = (operation === "buy") ?
        await portfolioOperations.buy(id, symbol, price, amount) :
        await portfolioOperations.sell(id, symbol, price, amount);
      // console.log("buy or sell")
      if (ok) {
        res.send(result);
      } else {
        console.log(message);
        res.status(400).send(message);
      }
    } else {
      const ss = "Unknown portfolio action: " + operation;
      console.error(ss);
      res.status(400).send(ss);
    }
  }
  catch (error) {
    const errMes = "Portfolio action error: " + error.message;
    console.error(errMes);
    res.status(500).send(errMes);
  }
})




  
module.exports = router;
