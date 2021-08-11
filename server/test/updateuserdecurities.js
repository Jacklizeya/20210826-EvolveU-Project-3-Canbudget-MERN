
const mongoose = require('mongoose');
require("./appSmall")
const user = require("../models/user");

clientId =mongoose.Types.ObjectId("60d352f384877e3111c5ffb8");

console.log("Start")

for (let  i=1; i<200; i++){
  user.updateUserSecurities(clientId,i, 2*i+0.1).then( console.log(i));
}
console.log("End")

