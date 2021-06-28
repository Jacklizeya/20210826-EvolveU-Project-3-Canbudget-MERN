import React, { useState, useEffect } from "react"
import axios from "axios"
import Chart from 'react-apexcharts'
import { donutData } from './data/apexDataConvertor'

export default function Donut() {

  /// const [users, setUsers] = useState([])      Don't need until users in db
  const [labels, setLabels] = useState(donutData.labels)
  const [values, setValues] = useState(donutData.series)
  const [donutProps, setDonutProps] = useState({
    options: {
      labels: labels,
      title: {
        text: 'Donut'
      }
    },
    series: values,
    width: 600
  })
  

  useEffect(() => {
    async function getData() {
        let {data} = await axios.get("/api/user")
        const user = data[0] /// Only selecting one user right now
        let labelsList = []
        for (const index in user.balanceSheet) 
            labelsList.push(user.balanceSheet[index].name)
        let valuesList = []
        for (const index in user.balanceSheet) 
            valuesList.push(user.balanceSheet[index].value)
        setLabels(labelsList)
        setValues(valuesList)
    }
    getData()
  },[])

  useEffect(() => {
    function updateGraph() {
      setDonutProps({
        options: {
          labels: labels,
          title: {
            text: 'Donut'
          }
        },
        series: values,
        width: 600
      })
    }
    updateGraph()
  })

    return (
      <div className="donut">
        <Chart 
          options={donutProps.options} 
          series={donutProps.series} 
          type="donut" 
          width={donutProps.width} 
        />
      </div>
    )
}