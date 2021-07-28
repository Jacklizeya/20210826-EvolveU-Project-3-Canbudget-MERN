import React, {useState, useEffect} from 'react'
import Chart from "react-apexcharts"

// data is feed in here
export default function TransactionChart({data}) {
    console.log("inside transaction chart", data)
    const spendingRows = data.filter(row => row.values.amount < 0)
    console.log("inside transaction chart spending", spendingRows.length)

    let category = []
    spendingRows.forEach(row => {if (!category.includes(row.values.category)) {category.push(row.values.category)}})
    console.log("category", category)

    let sumByCategory = {}
    category.forEach(subcategory => sumByCategory[subcategory] = 0)
    spendingRows.forEach(row=> {
        sumByCategory[row.values.category] += row.values.amount
    })


    let valuesRaw = Object.values(sumByCategory)
    let values = valuesRaw.map(value => -1 * Math.floor(value))
    let keys = Object.keys(sumByCategory)
    console.log("sumByCategory", sumByCategory)
    console.log("values", values)
    console.log("keys", keys)
    

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState( values )
    const [labels, setLables] = useState( ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B'])


    
    return (
        <div>
            <Chart
            options={options}
            series = {series}
            type="donut"
            width="380"
            labels={labels}
            />
        </div>
    )
}
