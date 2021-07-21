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
        xaxis: {
            type: 'datetime'
        },
        colors: ['#4CAF50','#3F51B5','#FF9800','#03A9F4'],
      },
      series: [
        {
            name: 'Assets',
            type: 'line',  
            data: lineData.assets,
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
