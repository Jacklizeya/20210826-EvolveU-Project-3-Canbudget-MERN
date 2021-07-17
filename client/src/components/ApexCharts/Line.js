import React, { useState } from "react"
import Chart from 'react-apexcharts'
import { lineData } from './data/apexDataConvertor'

export default function Line() {
  // eslint-disable-next-line
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
            name: 'Assets',
            type: 'line',  
            data: lineData.assets
        },
        {
          name: 'Liabilities',
          type: 'line',  
          data: lineData.liabilities
        },
        {
            name: 'Net Worth',
            type: 'column',
            data: lineData.netWorth
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
