import React, { useEffect, useState } from "react"
import Chart from 'react-apexcharts'
import { lineData } from './data/apexDataConvertor'

export default function Line({parentData}) {

  const [lineProps, setLineProps] = useState(
    {
      options: {
        chart: {
            type: 'line',
            height: '100%'
        },
        labels: lineData.labels,
        xaxis: {
            type: 'datetime',
            title: {
              text: 'Date'
            }
        },
        yaxis: {
            type: 'numeric',
            title: {
              text: 'Cumulative Spending ($)'
            }
        },
        colors: ['#4CAF50','#3F51B5','#FF9800','#03A9F4'],
        plotOptions: {
          area: {
              fillTo: 'end',
          }
        },
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

  useEffect(() => {
    if (parentData) {
      setLineProps(l => ({...l, 
        options: {...l.options, 
          labels: parentData.labels
        },
        series: parentData.series ? parentData.series : lineProps.series
      }))
    }
  },[parentData])

    return (
      <div className="budget-line-chart">
        {lineProps ?
          <Chart 
            options={lineProps.options} 
            series={lineProps.series} 
            width={lineProps.width} 
          />
        : null}
      </div>
    )
}
