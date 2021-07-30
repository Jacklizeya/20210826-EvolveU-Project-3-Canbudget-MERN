import React from 'react'
import Chart from "react-apexcharts"

// data is feed in here
export default function TransactionChart({data}) {


    const spendingRows = data.filter(row => row.values.amount < 0 && !row.values.category.includes("Transfer") && !row.values.category.includes("Payment"))


    let category = []
    spendingRows.forEach(row => {if (!category.includes(row.values.category)) {category.push(row.values.category)}})


    let sumByCategory = {}
    category.forEach(subcategory => sumByCategory[subcategory] = 0)
    spendingRows.forEach(row=> {
        sumByCategory[row.values.category] += row.values.amount
    })

    let valuesRaw = Object.values(sumByCategory)
    let values = valuesRaw.map(value => -1 * Math.floor(value))
    let keys = Object.keys(sumByCategory)
 
    let options = {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: keys,
        }
      }
    let series = [{
        data: values
      }] 
      
    return (
        <div>
            <Chart
            options={options}
            series = {series}
            type="bar"
            width="1300"
            height="500"
            />
        </div>
    )
}
