/*
Loads  data from ./listing_status.csv' file to DB.
'listing_status.csv' is taken from Listing & Delisting Status: 
https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=key
data will be loaded to stocks.stocks collection

*/
const fs        = require('fs')

require("./appSmall")
const stockListing = require("../models/stock") 

let fileName = './listing_status.csv'
console.log("Reading file")
    
fs.readFile(fileName,'utf8', (err,data) => {
    if (err){
        console.error(`Error reading ${fileName} - ${err}`)
        return;
    }
    Save2DB(data).then(() => {console.log("Done !")});     
})


async function Save2DB(data){
    console.log("Deleting all!");
    let del = stockListing.deleteAllStocks();

    console.log("Start loading... ")
    let lines = data.split('\n')
    let count = 0;
    await del;
    for (let i = 1; i <= lines.length; i++){
        let line = lines[i-1];
        let words = line.split(',');
        
        if (words==''){
            continue
        }
        let stock   = words[3].trim();
        let status  = words[6].trim();
        if ( status !='Active'){
            continue
        }
            
        let symbol  = words[0].trim();
        let name    = words[1].trim();
        let exchange= words[2].trim();

        await stockListing.uploadStock(symbol, stock, name, exchange);
        count++;
        if ((count % 100)==0 ){
            console.log(`${count} records added`);
            //break;
        }

        //console.log(`${i}.   ${symbol}    ${name}  ${exchange}`)
    }
    console.log(`${count} records added`);
}