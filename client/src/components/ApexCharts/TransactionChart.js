import React from 'react'
import Chart from "react-apexcharts"

// data is feed in here
export default function TransactionChart({data}) {

    console.log(data)
    const spendingRows = data.filter(row => row.values.amount < 0 && !row.values.category.includes("Transfer") && !row.values.category.includes("Payment"))

    let category = []
    spendingRows.forEach(row => {if (!category.includes(row.values.category)) {category.push(row.values.category)}})

    for (let i in spendingRows) {
      let splitCategories = spendingRows[i].values.category.split(', ')
      spendingRows[i].values.category = splitCategories[splitCategories.length - 1]
    }

    let sumByCategory = {}
    category.forEach(subcategory => sumByCategory[subcategory] = 0)
    spendingRows.forEach(row=> {
        sumByCategory[row.values.category] += row.values.amount
    })

    let keys = Object.keys(sumByCategory)

    // let values = []
    // for (let i in sumByCategory) {
    //   values.push({
    //     name: i,
    //     data: [Number(sumByCategory[i] * -1).toFixed(2)],
    //     type: 'bar'
    //   })
    // }

    let valuesRaw = Object.values(sumByCategory)
    let values = valuesRaw.map(value => -1 * Math.floor(value))
    
 
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
          title: {
            text: 'Value ($)'
          }
        },
        yaxis: {
            title: {
              text: 'Categories'
            }
        },
      }
    let series = [{
        name: 'Monthly Total',
        data: values
      }] 
      
    return (
        <div style={{width:'50%'}}>
            <Chart
              options={options}
              series = {series}
              type="bar"
              width='90%'
            />
        </div>
    )
}
