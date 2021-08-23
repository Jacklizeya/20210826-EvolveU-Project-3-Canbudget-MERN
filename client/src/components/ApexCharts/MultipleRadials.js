import React, {useState, useEffect} from 'react'
import Chart from 'react-apexcharts'

export default function MultipleRadials({parentData}) {

  const [radialBarProps, setRadialBarProps] = useState({
    series: [76, 67, 61, 90],
    options: {
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            }
          }
        }
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
      legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'left',
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
          vertical: 3
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
              show: false
          }
        }
      }]
    }
  })

  useEffect(() => {
    let counts = {
      asset: 0,
      liabilities: 0
    }
    for (let i in parentData) {
      if (parentData[i].type === 'asset') {
        counts.asset = counts.asset + Math.abs(parentData[i].value)
      } else if (parentData[i].type === 'liability') {
        counts.liabilities = counts.liabilities + Math.abs(parentData[i].value)
      }
    }
    setRadialBarProps(r => ({
      ...r,
      series: [counts.asset, counts.liabilities],
      options: {
        ...r.options,
        labels: ['Assets', 'Liabilites']
      }
    }))
  },[parentData])

  return (
    <div id="chart">
      <Chart options={radialBarProps.options} series={radialBarProps.series} type="radialBar" width={750} />
    </div>
  )
}

