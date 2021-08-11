const usersMap = require('./usersMapManipulations');
const companyInformation = require('./getCompanyInformation');
const fetchStock = require('./fetchStock2');

async function getDataForUser(id) {
    const user = await usersMap.addUser(id);
    const compInfo = await companyInformation.getAllCompaniesInformation(user);
    const timeseriesArray = await fetchStock.getTimeSeriesForUser(user);
    let resultObj = createPortfolioElementsAndLast(user, timeseriesArray, true);
    resultObj.companies = compInfo;
    return resultObj;
}


function createPortfolioElementsAndLast(user, timeseriesArray, isFullData = false) {
    let portfolioArray = [];
    let lastData = [];
    let fullData = [];
    let totalSum = 0;
    for (let [symbol, stock] of user.stocks) {

        let ts = fetchStock.findTimeseries(symbol, 0, timeseriesArray);
        lastData.push(ts.lastDataElement)
        if (stock.portfolioAmount > 0) {
            let price = ts.lastDataElement.close;
            let amount = stock.portfolioAmount;
            let stSum = amount * price;
            totalSum += stSum;

            let portfolioElement = { symbol, amount, price }
            portfolioArray.push(portfolioElement);
        }
        // console.log(symbol, stock)
        if (isFullData && stock.watchlist) {
            if (stock.period != 0) {
                ts = fetchStock.findTimeseries(symbol, stock.period, timeseriesArray);
            }
            // let symbolArray = [];
            // for (const property in stock) {
            //     const el = { dateS: property, close: parseFloat(stock[property]["4. close"]) };
            //     symbolArray.push(el);
            // }
            fullData.push({ symbol, period: stock.period, data: ts.symbolArray })
        }
    }
    usersMap.setAccountBalance(user, user.balance, totalSum );
    const portfolioObj = { balance: user.balance, totalSum, portfolioArray }
    const resultOj = { portfolioObj, lastData };
    if (isFullData) {
        resultOj.fullData = fullData;
    }
    return resultOj;
}


module.exports = {
    getDataForUser
}
