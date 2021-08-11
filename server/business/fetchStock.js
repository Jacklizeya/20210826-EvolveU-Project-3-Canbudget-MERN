const portfolioDB = require('../models/portfolio');
const watchListDB = require('../models/watchList');
const userDB = require('../models/user');
const companyDB = require('../models/companyInformation');

const timeStock = require('../models/timeSeriesStock');

async function fetchStock(id, isFullData = false) {
    const watchList = await watchListDB.getWatchList(id);
    const portfolio = await portfolioDB.getPortfolio(id);
    const user = await userDB.getSecuritiesAccocunt(id);
    //    console.log("fetchStock - Start");
    if (!userDB) {
        return null;
    }

    const unitedList = combineLists(portfolio, watchList);

    const fullData = [];
    const lastData = []
    const portfolioArray = [];
    const balance = user.securitiesAccount;
    let totalSum = 0.0

    for (const val of unitedList) {
        let noErrors = true;
        //      console.log(1);

        const stockAll = await timeStock.intradayStocks(val.symbol, false);
        property = getPropertyName(stockAll, 1);
        const property0 = getPropertyName(stockAll, 0);

        if (property0 == null || property0 === "" || property0.startsWith("Error")) {
            console.error("Error getting from Alpha >>>>>> ", val.symbol);
            noErrors = false;
        }

        const amount = getNumberOfStocs(portfolio, val.symbol);

        //      console.log('1.2 ' +val.symbol);

        let lastDataElement = {};
        lastDataElement.symbol = val.symbol;
        lastDataElement.amount = amount;
        lastDataElement.balance = balance;

        let stock;
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

        if (dataExists) {
            const lastDate = getPropertyName(stock, 0);
            lastDataElement.lastDate = lastDate;
            lastDataElement.open = parseFloat(stock[lastDate]["1. open"]);
            lastDataElement.high = parseFloat(stock[lastDate]["2. high"]);
            lastDataElement.low = parseFloat(stock[lastDate]["3. low"]);
            lastDataElement.close = parseFloat(stock[lastDate]["4. close"]);
            lastDataElement.volume = parseInt(stock[lastDate]["5. volume"]);
        }
        else {
            // lastDataElement.lastDate = "";
            // lastDataElement.open = 0;
            // lastDataElement.high = 0;
            // lastDataElement.low = 0;
            // lastDataElement.close = 0;
            // lastDataElement.volume = 0;
        }
        if (!noErrors) {
            lastDataElement.lastDate = "Error fetching data from the exchange"
        }

        if (val.watch) {
            const company = await companyDB.getCompanyInformation(val.symbol)
            if (company && company.Symbol!=null && company.Name != null) {
                lastDataElement.name = company.Name;
                lastDataElement.sector = company.Sector;
                lastDataElement.industry = company.Industry;
                lastDataElement.exchange = company.Exchange;
            }else{
                lastDataElement.name = "Can't get company information from the exchange";              
                lastDataElement.sector = "";
                lastDataElement.industry = "";

            }

            lastData.push(lastDataElement);
            //          console.log(5);
            if (isFullData && dataExists) {
                let symbalArray = [];
                for (const property in stock) {
                    const el = { dateS: property, close: parseFloat(stock[property]["4. close"]) };
                    symbalArray.push(el);
                }
                fullData.push({ symbol: val.symbol, data: symbalArray })
            }
        }
        //        console.log(6, val.port);

        if (val.port) {
            //            console.log(6.1);

            let portfolioElement = { symbol: val.symbol, amount }
            //            console.log(6.5)
            if (dataExists) {
                const price = lastDataElement.close;
                const stSum = amount * price;
                portfolioElement.price = price;
                totalSum += stSum;
            }
            portfolioArray.push(portfolioElement);
        }
    }
    //    console.log("fetchStock - 7");
    totalSum += balance;
    const portfolioObj = { balance, totalSum, portfolioArray }
    const resultOj = { portfolioObj, lastData };
    if (isFullData) {
        resultOj.fullData = fullData;
    }
    //    console.log("fetchStock - End");

    return resultOj;
}

function combineLists(port, watch) {
    let uni = [];
    for (const val of port) {
        uni.push({ symbol: val.symbol, port: true, watch: false })
    }
    for (const val of watch) {
        const index = uni.findIndex((u, index) => { return u.symbol === val.symbol });
        if (index >= 0) {
            uni[index].watch = true;
        } else {
            uni.push({ symbol: val.symbol, port: false, watch: true })
        }
    }
    return uni;
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

function getNumberOfStocs(portfolio, symbol) {
    for (const val of portfolio) {
        if (val.symbol == symbol) {
            return val.amount;
        }
    }
    return 0;
}

module.exports = {
    fetchStock
}