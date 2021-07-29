import React, {useState, useEffect} from 'react'
import Chart from "react-apexcharts"

// data is feed in here
export default function TransactionChart({data}) {
    console.log("inside transaction chart", data)
    const spendingRows = data.filter(row => row.values.amount < 0 && !row.values.category.includes("Transfer") && !row.values.category.includes("Payment"))
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
      
    let labels = ['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E', 'A', 'B']

    // //I cannot do this? Why
    // useEffect(()=>{console.log("useEffect")}, []) 
    // I did not see any need of setState here
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
