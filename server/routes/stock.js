const express = require('express');
let router = express.Router();

const stockDB = require('../models/stock');




router.get('/search/:stock', async (req, res) => {
    try {
        let stock = req.params.stock;
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

router.post('/:id/watch', async (req, res) => {
  try {
    console.log("watcH")
    const id = req.params.id;
    const action = req.body;
    const symbol = action.symbol;
    const operation = action.operation;
    switch (operation) {
      case "add":
        let data = await watchList.add(id, symbol);
        //  console.log("data=",data)  ;
        res.send(data);
        break;

      case "takeAway":
        res.send(await watchList.takeAway(id, symbol));
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
        await operations.buy(id, symbol, price, amount) :
        await operations.sell(id, symbol, price, amount);
      console.log("buy or sell")
      if (ok) {
        res.send(result);
      } else {
        console.log(message);
        res.status(400).send(s);
      }
    } else {
      const s = "Unknown portfolio action: " + operation;
      console.error(s);
      res.status(400).send(s);
    }
  }
  catch (error) {
    const s = "Portfolio action error: " + error.message;
    console.error(s);
    res.status(500).send(s);
  }
})




  
module.exports = router;
