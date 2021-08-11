const fetch = require('node-fetch');
const alphaKey  = require("./alphaKey")


const AlphaFunctions= ["TIME_SERIES_INTRADAY","TIME_SERIES_DAILY","TIME_SERIES_WEEKLY"];


//const INTERVAL = "1min"; //5min, 15min, 30min, 60min

async function getStockSeries0(func, symbol, outputsize){
    
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&outputsize=${outputsize}` + await alphaKey.getAlphaKey(true);
    //console.log(url);
    try {
        let responce = await fetch(url);
        if ( responce.ok){
            return await responce.json();
        }               
    } catch (error) {
        console.error(error);

    }
    return {};
}

async function getStockSeries(funcN, symbol, fullSize = false){
    outputsize = fullSize ? "full"  : "compact";
    if (funcN < 0 ) {funcN=0;}   
    if (funcN >=  AlphaFunctions.length ) { funcN=AlphaFunctions.length-1;}   
    return getStockSeries0(AlphaFunctions[funcN], symbol, outputsize);
}


async function intradayStocks(symbol, fullSize = false){
    outputsize = fullSize ? "full"  : "compact";
    return getStockSeries(0, symbol, outputsize)
}

module.exports = {
    AlphaFunctions,
    getStockSeries,
    intradayStocks
}