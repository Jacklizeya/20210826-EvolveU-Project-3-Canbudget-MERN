import React, { useState} from "react"
import Chart from 'react-apexcharts'

import { portfolioWorthData } from "../../data/apexDataConvertor"

export default function DashboardStocksTimeseries({graphData}) {

  // const [labels, setLabels] = useState(null)
  // const [seriesOneData, setSeriesOneData] = useState(null)
  // eslint-disable-next-line
  const [lineProps, setLineProps] = useState(
    {
      options: {
        chart: {
            type: 'line'
        },
        labels: portfolioWorthData.labels,
        xaxis: {
            type: 'datetime'
        },
        colors: ['#4CAF50','#F9CE1D','#FF9800','#3F51B5','#03A9F4'],
      },
      series: [
        {
            name: 'Value',
            type: 'line',  
            data: portfolioWorthData.portfolioWorth,
        },
      ],
      width: 400
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
