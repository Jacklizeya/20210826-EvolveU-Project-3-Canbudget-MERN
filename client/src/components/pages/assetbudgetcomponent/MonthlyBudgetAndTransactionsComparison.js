import React, {useState, useEffect, useContext } from 'react'
import axios from "axios"
import AuthenticationContext from '../../auth/AuthenticationContext';
import Chart from "react-apexcharts"
import { Descriptiondiv } from '../assetAndBudget.elements';
// This is affected by viewDate, viewDate will affect userCashFlow, 

const Months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function MonthlyBudgetAndTransactions({viewDate, userCashFlow, addStatus, deleteStatus}) {

    const {id} = useContext(AuthenticationContext)
    const [transactionData, setTransactionData] = useState([])
    const [dataForChart, setDataForChart] = useState([])
    const [series, setSeries] = useState([])
    const [options, setOptions] = useState({})

    useEffect(() => {
        async function getUserandSetTransactionData() {
            let {data} = await axios.get(`/api/user/${id}/transaction`, )   
            setTransactionData(data)
            // console.log("user budget", userCashFlow)
            // console.log("user transaction", data)
        }
        getUserandSetTransactionData()
    }, [addStatus, deleteStatus])
    // DATA manipulation
    useEffect(()=> {
        // console.log("inside goal Chart", transactionData)
        const spendingRows = transactionData.filter(row => row.amount < 0 && row.date.includes(viewDate.substring(0, 7)) && !row.category.includes("Transfer") && !row.category.includes("Payment"))
        // console.log("inside transaction chart spending", spendingRows.length)

        let category = []
        spendingRows.forEach(row => {if (!category.includes(row.category)) {category.push(row.category)}})
        // console.log("category", category)

        let sumByCategory = {}
        category.forEach(subcategory => sumByCategory[subcategory] = 0)

        spendingRows.forEach(row=> {
            sumByCategory[row.category] += row.amount
        })

        let valuesRaw = Object.values(sumByCategory)
        let values = valuesRaw.map(value => -1 * Math.floor(value))
        let keys = Object.keys(sumByCategory)
        // console.log("sumByCategory", sumByCategory)
        // console.log("values", values)
        // console.log("keys", keys)
        // console.log(userCashFlow[10])                                
        // console.log(userCashFlow.filter(row => row["name"].includes("travel, taxi")))
    
        let dataForChartCopy = keys.map((key, index) => {
        return {x: key, y: values[index], goals: [{
        name: "Budgeted", 
        // value: userCashFlow.filter(row => row["name"].includes(key).amount * -1), 
        value: userCashFlow.filter(row => row["name"].includes(key.toLowerCase()))[0]? userCashFlow.filter(row => row["name"].includes(key.toLowerCase()))[0].amount * -1: 0, 
        strokeWidth: 5, 
        strokeColor: '#775DD0'}]} })
        setDataForChart(dataForChartCopy)



    }, [userCashFlow.length, transactionData.length])

    useEffect(()=>{setSeries([{name: 'Actual', data: dataForChart}])}, [dataForChart.length])    
    useEffect(()=>{setOptions({
        chart: {
          height: 600,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        colors: ['#01345B'],
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
            fillColors: ['#01345B', '#775DD0']
          }
        }
      })}, [dataForChart.length])
    
    return (
        
        <div>
             <Descriptiondiv style={{"text-align": "center"}}> Budget and Spending for {viewDate.substring(0, 4)} {Months[parseInt(viewDate.substring(5, 7)) - 1]} </Descriptiondiv> 
            {dataForChart.length? 
             (<Chart 
                
                options={options}
                series={series}
                type="bar"
                width="100%"
                height="400"/>) : null}
        </div>
    )
}
