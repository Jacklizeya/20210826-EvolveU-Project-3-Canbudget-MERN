require("./appSmall")
const stockDB = require("../models/stock");

console.log("Start")

//stockDB.getSmrtList("AAA").then(console.log);
stockDB.getSmrtList("Micr").then((a) =>printArray(a,"result"));

function printArray(ar, title){
    console.log(title +"  ============>")
    for (const val of ar){
        console.log(val);
    }
    console.log("---------------------------------------------");

}
