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
    let seriesOneArray = []
    let seriesTwoArray = []

    for (const category in data) {
        labelsArray.push(new Date(data[category].date).getTime())
        seriesOneArray.push(parseInt(data[category].income))
        seriesTwoArray.push(parseInt(data[category].expenses))
    }
    const dataProps = {
        labels: labelsArray, 
        income: seriesOneArray,
        expenses: seriesTwoArray
    }
    return dataProps
}

const donutData = convertDonutData(donutMockData)
const lineData = convertTwoSeriesLineData(lineMockData)

export {
    donutData,
    lineData
}