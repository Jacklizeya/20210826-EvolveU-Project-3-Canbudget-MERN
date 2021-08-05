import {donutMockData, lineMockData} from './mockData.js'
import portfolioWorthMockData from './portfolioWorthData'


function convertDonutData(data) {
    let labelsArray = []
    let seriesArray = []

    for (const category in data) {
        labelsArray.push(data[category].name)
        seriesArray.push(parseInt(data[category].value))
    }
    const dataProps = {
        labels: labelsArray, 
        series: seriesArray
    }
    return dataProps
}

function convertTwoSeriesLineData(data) {
    let labelsArray = []
    let lineOneArray = []
    let lineTwoArray = []
    let barArray = []

    for (const category in data) {
        labelsArray.push(new Date(data[category].date).getTime())
        lineOneArray.push(parseInt(data[category].assets))
        lineTwoArray.push(parseInt(data[category].liabilities))
        barArray.push(parseInt(data[category].netWorth))
    }
    const dataProps = {
        labels: labelsArray, 
        assets: lineOneArray,
        liabilities: lineTwoArray,
        netWorth: barArray
    }
    return dataProps
}

function convertPortfolioWorthData(data) {
    let labelsArray = []
    let seriesOneData = []
    for (let index in data) {
        let day = parseInt(data[index].date.slice(0,2))
        let month = parseInt(data[index].date.slice(3,5)) - 1
        let year = parseInt(data[index].date.slice(6,10))
        labelsArray.push(new Date(year, month, day).getTime())
        seriesOneData.push(parseInt(data[index].value))
    }
    const dataProps = {
        labels: labelsArray,
        portfolioWorth: seriesOneData
    }
    return dataProps
}

const donutData = convertDonutData(donutMockData)
const lineData = convertTwoSeriesLineData(lineMockData)
const portfolioWorthData = convertPortfolioWorthData(portfolioWorthMockData)

export {
    donutData,
    lineData,
    portfolioWorthData
}