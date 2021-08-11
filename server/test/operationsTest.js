
require("./appSmall")
const operations = require('../business/operations');

const id = '60d352f384877e3111c5ffb8';
console.log("start");

//operations.buy(id,"IBM", 5 ,1).then((c) => console.log(c)) ;
//operations.sell(id,"AAPL", 10 ,100).then((c) => console.log(c)) ;


//operations.buy(id, "AAPL", 100 ,10).then(c=> console.log(c)) ;
operations.sell(id,"AAPL", 100 ,10).then((c) => console.log(c)) ;
