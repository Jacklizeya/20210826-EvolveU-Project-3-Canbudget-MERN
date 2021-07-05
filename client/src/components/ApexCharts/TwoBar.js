import React, { useState, useEffect } from "react"
import axios from "axios"
import Chart from 'react-apexcharts'
import { donutData } from './data/apexDataConvertor'

export default function Stackedar() {

    /// const [users, setUsers] = useState([])      Don't need until users in db
    const [seriesProps, setSeriesProps] = useState(
      [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43, 21, 49]
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27, 33, 12]
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14, 15, 13]
      }]
    )

    const [stackedBarProps, setStackedBarProps] = useState({
      series: seriesProps,
      options: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2021 GMT', '02/01/2021 GMT', '03/01/2021 GMT', '04/01/2021 GMT',
            '05/01/2021 GMT', '06/01/2021 GMT','07/01/2021 GMT', '08/01/2021 GMT',
          ],
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'right',
          offsetX: 0,
          offsetY: 50
        },
      },
      width: 750
    })
  
   useEffect(() => {
      async function getData() {
          let {data} = await axios.get("/api/user")
          const user = data[0] /// Only selecting one user right now
          let seriesArray = []
          for (const index in user.cashFlow) {
            if (user.cashFlow[index].amount < 0) {
              let i = 0
              let valueArray = []
              while(i < 8) {
                valueArray.push(user.cashFlow[index].amount)
                i++
              }
              seriesArray.push({name: user.cashFlow[index].name, data: valueArray})
            }
          }
          setSeriesProps(seriesArray)
      }
      getData()
    },[])
  
    useEffect(() => {
      function updateGraph() {
        setStackedBarProps({
          series: seriesProps,
          options: {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            xaxis: {
              type: 'datetime',
              categories: ['01/01/2021 GMT', '02/01/2021 GMT', '03/01/2021 GMT', '04/01/2021 GMT',
                '05/01/2021 GMT', '06/01/2021 GMT','07/01/2021 GMT', '08/01/2021 GMT',
              ],
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'right',
              offsetX: 0,
              offsetY: 50
            },
          },
          width: 750    
        })
      }
      updateGraph()
    },[seriesProps]) 



  return (
    <div type='chart'>
      <Chart 
        options={stackedBarProps.options} 
        series={stackedBarProps.series} 
        width={stackedBarProps.width}
        type='bar'
      />
    </div>
  )
}
