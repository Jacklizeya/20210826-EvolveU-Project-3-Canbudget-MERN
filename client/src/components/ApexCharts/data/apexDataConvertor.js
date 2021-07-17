import {donutMockData, lineMockData} from './mockData.js'

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

const donutData = convertDonutData(donutMockData)
const lineData = convertTwoSeriesLineData(lineMockData)

export {
    donutData,
    lineData
}