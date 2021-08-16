const timeStock = require('../models/timeSeriesStock');
const usersMap = require('./usersMapManipulations');

async function getTimeSeries(aFunction, symbol, isFullData) {
    const stockAll = await timeStock.getStockSeries(aFunction, symbol, false);
    return timeSeriesConvert(symbol, aFunction, stockAll, isFullData);
}

function findTimeseries(symbol, period, timeseriesArray) {
    for (const ser of timeseriesArray) {
        if (ser.symbol === symbol && ser.period === period) {
            // console.log(ser.symbol,ser.period);
            return ser;
        }
    }
    console.log("findTimeseries Error!!! " + symbol + " " + timeseriesArray)
    return null;
}

async function getTimeSeriesForUser(user) {
    let resultArray = [];
    let resultArray2 = [];

    let stockArrayProm = [];
    let extraArray = [];
    let descrArrayProm = [];
    let stockAll;
    //   user  = { stocks: new Map(), balance: 0 };
    //   stock = { portfolioAmount: 0, watchlist: false , period:0};
    for (let [symbol, stock] of user.stocks) {
        if (stock.watchlist && stock.period > 0) {
            stockAll = timeStock.getStockSeries(stock.period, symbol, false);

            stockArrayProm.push(stockAll);
            descrArrayProm.push({ symbol, period: stock.period, fullData: true });
        }
        stockAll = usersMap.getCacheData(symbol)
        if (stockAll) {
            extraArray.push(stockAll)
        } else {
            stockAll = timeStock.intradayStocks(symbol);

            stockArrayProm.push(stockAll);
            // console.log("<",stock.period,">")
            let fullData = stock.watchlist && stock.period == 0;
            descrArrayProm.push({ symbol, period: 0, fullData });
        }
    }
    if (stockArrayProm.length > 0) {
        resultArray = await Promise.all(stockArrayProm);
        for (let i = 0; i < resultArray.length; i++) {
            let convResult = timeSeriesConvert(descrArrayProm[i].symbol, descrArrayProm[i].period,
                resultArray[i], descrArrayProm[i].fullData);
            resultArray2.push(convResult);
        }
    }
    if (extraArray.length > 0) {
        return [...resultArray2, ...extraArray];
    }
    return resultArray2;
}


function timeSeriesConvert(symbol, period, stockAll, isFullData) {
    let noErrors = true;
    property = getPropertyName(stockAll, 1); // Time serries property name
    const property0 = getPropertyName(stockAll, 0);

    if (property0 == null || property0 === "" || property0.startsWith("Error")) {
        console.error("Error getting from Alpha >>>>>> ", val.symbol);
        noErrors = false;
    }

    let dataExists = false;
    if (noErrors) {
        //      console.log(1.3);
        //      console.log(property);
        //      console.log(stockAll)
        stock = stockAll[property];
        //      console.log(1.4);
        //     console.log(stock)
        dataExists = Object.keys(stock).length > 0;
        //      console.log(2);
    }
    let lastDataElement = {symbol};
    if (dataExists) {
        const lastDate = getPropertyName(stock, 0);
        lastDataElement.lastDate = lastDate;
        lastDataElement.open = parseFloat(stock[lastDate]["1. open"]);
        lastDataElement.high = parseFloat(stock[lastDate]["2. high"]);
        lastDataElement.low = parseFloat(stock[lastDate]["3. low"]);
        lastDataElement.close = parseFloat(stock[lastDate]["4. close"]);
        lastDataElement.volume = parseInt(stock[lastDate]["5. volume"]);
    } else {
        lastDataElement.close = 0;
    }


    if (!noErrors) {
        lastDataElement.lastDate = "Error fetching data from the exchange"

    }
    lastDataElement.Ok = dataExists;
    let symbolArray = [];
    if (isFullData && dataExists) {
        for (const property in stock) {
            const el = { dateS: property, close: parseFloat(stock[property]["4. close"]) };
            symbolArray.push(el);
        }
        // fullData.push({ symbol: val.symbol, data: symbolArray })
    }
    return { symbol, period, lastDataElement, symbolArray }
}


function getPropertyName(obj, n) {
    let cnt = 0
    for (const property in obj) {
        if (cnt == n) {
            return property;
        }
        cnt++;
    }
    return "";
}



module.exports = {
    getTimeSeries,
    findTimeseries,
    getTimeSeriesForUser
}

getTimeSeries