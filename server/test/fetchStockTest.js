
const mongoose = require('mongoose');

require("./appSmall")

const  fetchStockModule  = require("../business/fetchStock");

 
fetchStockModule.fetchStock(mongoose.Types.ObjectId('60d352f384877e3111c5ffb8'), true).then((o) => printData(o) );



function printArray(ar, title){
    console.log(title +"  ============>")
    for (const val of ar){
        console.log(val);
    }
    console.log("---------------------------------------------");

}

function printData(o){
    console.log(o);

    console.log ("portfolioArray ==>")
    for (const property in o.portfolioObj.portfolioArray) {
        console.log('Propery name =', property);
    }
    printArray(o.portfolioObj.portfolioArray, "o.portfolioObj.portfolioArray");
    printArray(o.lastData, "o.lastData");
    printArray(o.fullData, "o.fullData");

}