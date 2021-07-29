import React, {useState, useEffect} from 'react'
import Chart from "react-apexcharts"

// data is feed in here
export default function BudgetSpendingChart({data}) {
    console.log("inside goal Chart", data)
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
    
    let dataForChart = keys.map((key, index) => {return {x: key, y: values[index], goals: [{name: "Budgeted", value: values[index] * (1 + Math.pow(-1, Math.floor(Math.random() *100)) * Math.floor(Math.random() *100)/100), strokeWidth: 5, strokeColor: '#775DD0'}]} })


    let series = [
        {
          name: 'Actual',
          data: dataForChart     
        }
        ]
          
        //   [
        //     {
        //       x: '2011',
        //       y: 12,
        //       goals: [
        //         {
        //           name: 'Budgeted',
        //           value: 14,
        //           strokeWidth: 5,
        //           strokeColor: '#775DD0'
        //         }
        //       ]
        //     },
        //     {
        //       x: '2012',
        //       y: 44,
        //       goals: [
        //         {
        //           name: 'Budgeted',
        //           value: 54,
        //           strokeWidth: 5,
        //           strokeColor: '#775DD0'
        //         }
        //       ]
        //     },
        //     {
        //       x: '2013',
        //       y: 54,
        //       goals: [
        //         {
        //           name: 'Budgeted',
        //           value: 52,
        //           strokeWidth: 5,
        //           strokeColor: '#775DD0'
        //         }
        //       ]
        //     },
        //     {
        //       x: '2014',
        //       y: 66,
        //       goals: [
        //         {
        //           name: 'Budgeted',
        //           value: 65,
        //           strokeWidth: 5,
        //           strokeColor: '#775DD0'
        //         }
        //       ]
        //     },
        //     {
        //       x: '2015',
        //       y: 81,
        //       goals: [
        //         {
        //           name: 'Budgeted',
        //           value: 66,
        //           strokeWidth: 5,
        //           strokeColor: '#775DD0'
        //         }
        //       ]
        //     },
        //     {
        //       x: '2016',
        //       y: 67,
        //       goals: [
        //         {
        //           name: 'Budgeted',
        //           value: 70,
        //           strokeWidth: 5,
        //           strokeColor: '#775DD0'
        //         }
        //       ]
        //     }
        //   ]
   

    let options = {
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          formatter: function(val, opt) {
            const goals =
              opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                .goals
        
            if (goals && goals.length) {
              return `${val} / ${goals[0].value}`
            }
            return val
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Budgeted'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        }
      }

    

    // //I cannot do this? Why
    // useEffect(()=>{console.log("useEffect")}, []) 
    // I did not see any need of setState here
    return (
        <div>
            <Chart 
                options={options}
                series={series}
                type="bar"
                height="350"
            />
        </div>
    )
}
