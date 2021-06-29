import React, { useState, useEffect } from "react"
import Chart from 'react-apexcharts'
import { lineData } from './data/apexDataConvertor'

export default function Line() {

  const [lineProps, setLineProps] = useState(
    {
      options: {
        chart: {
            type: 'line'
        },
        labels: lineData.labels,
        title: {
            text: 'Two Series Combo Chart'
        },
        xaxis: {
            type: 'datetime'
        },
      },
      series: [
        {
            name: 'Income',
            type: 'line',  
            data: lineData.income
        },
        {
            name: 'Expenses',
            type: 'column',
            data: lineData.expenses
        }
      ],
      width: 600
    }
  )

    return (
      <div className="line">
        <Chart 
          options={lineProps.options} 
          series={lineProps.series} 
          width={lineProps.width} 
        />
      </div>
    )
}
