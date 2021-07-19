import React, { useState, useEffect } from "react"
import Chart from 'react-apexcharts'
import { donutData } from './data/apexDataConvertor'

export default function Donut({data, showLegend}) {
  
  const [dataIsLiabilities, setdataIsLiabilities] = useState(true)
  const [labels, setLabels] = useState(donutData.labels)
  const [values, setValues] = useState(donutData.series)
  const [donutProps, setDonutProps] = useState({
    options: {
      labels: labels,
      legend: showLegend
    },
    series: values,
  })
  

  useEffect(() => {
    let labelsList = []
    for (const index in data) 
        labelsList.push(data[index].name)

    let valuesList = []
    for (const index in data) {
      valuesList.push(data[index].value)
      if (data[index].value > 0) {
        setdataIsLiabilities(false)
      }
    }
    if (dataIsLiabilities) {  
      valuesList = valuesList.map(function(num) {
        return num * -1
      })
    }
    setLabels(labelsList)
    setValues(valuesList)
  },[data, dataIsLiabilities])

  useEffect(() => {
    function updateGraph() {
      setDonutProps({...donutProps, 
        options: {...donutProps.options, labels: labels},
        series: values
      })
    }
    updateGraph()
  },[labels,values])

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