require("./appSmall")
const settingDB = require("../models/setting");

console.log("Start")
let setting = {
    name:   "",
    key:    "3PRM4UE4KPUFCKVB",
    interval:"5min",
    commission: 10
  };

//1min, 5min, 15min, 30min, 60min


settingDB.setSetting(setting).then((c) => console.log("set: ", c));
settingDB.getSetting().then((c) => console.log("get: ", c));
//settingDB.transferMoney(10).then((c) => console.log("transfer:",c));
//
console.log("End")

