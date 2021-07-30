
const mongoose = require('mongoose');
require("./appSmall")
const watchDB = require("../models/watchList");

clientId =mongoose.Types.ObjectId("60d352f384877e3111c5ffb8");
console.log("Start")
let watch1 = {
    client :clientId,
    symbol:"AMD",
    period:"1day"
	
  };

  let watch2 = {
    client : clientId,
    symbol:"INTC",
    period:"1day"
  };

//  watchDB.watchListModel.create(watch1);
//  watchDB.watchListModel.create(watch2);

watchDB.add(clientId,"AMD", "3days").then((c) => console.log(c));
watchDB.takeAway(clientId,"INTC").then((c) => console.log(c));
watchDB.getWatchList(clientId).then((c) => console.log(c));