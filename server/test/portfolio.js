
const mongoose = require('mongoose');
require("./appSmall")
const portfolioDB = require("../models/portfolio");

clientId =mongoose.Types.ObjectId("60d352f384877e3111c5ffb8");


console.log("Start")
let port1 = {
    client :clientId,
    symbol:"AMD",
    amount:100
  };

  let port2 = {
    client : clientId,
    symbol:"AAPL",
    amount:200
  };

  //portfolioDB.portfolioModel.create(port1).then((c) => console.log(c));
  //portfolioDB.portfolioModel.create(port2);
  
  //portfolioDB.add(clientId,"ZZZ",20).then((c)=> console.log(c));
    //portfolioDB.takeAway(clientId,"ZZZ",15).then((c)=> console.log(c));
  //portfolioDB.getAmount(clientId,"ZZZ").then((c)=> console.log(c));
  portfolioDB.getPortfolio(clientId).then((c)=> console.log(c));;
  // portfolioDB.add(clientId,"AMD",1);
  // portfolioDB.takeAway(clientId,"AAPL",1);
  // portfolioDB.getPortfolio(clientId).then((c)=> console.log(c));;

