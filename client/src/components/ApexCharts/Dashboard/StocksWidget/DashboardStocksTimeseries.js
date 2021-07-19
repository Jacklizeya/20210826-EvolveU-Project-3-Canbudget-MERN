import React, { useState } from "react"
import Chart from 'react-apexcharts'
import { lineData } from '../../data/apexDataConvertor'

export default function DashboardStocksTimeseries() {
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
        colors: ['#4CAF50','#F9CE1D','#FF9800','#3F51B5','#03A9F4']
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
