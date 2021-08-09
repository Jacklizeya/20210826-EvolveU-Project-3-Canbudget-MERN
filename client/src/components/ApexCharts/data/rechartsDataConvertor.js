import {donutMockData} from './mockData.js'

function convertData(data) {
    for (let i in data) {
        data[i].value = parseInt(data[i].value)
    }
    return data
}

const data = convertData(donutMockData)

export default data