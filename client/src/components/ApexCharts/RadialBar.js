import React, { useState, useEffect } from "react"
import Chart from 'react-apexcharts'

export default function RadialBar() {

    const [radialBarProps, setRadialBarProps] = useState(
        {
            series: [70],
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                    }
                    },
                },
                labels: ['Monthly Budget'],
                title: {
                    text: 'Progress Tracker'
                  }
            },
        }
    )
    return (
        <div id="chart">
            <Chart options={radialBarProps.options} series={radialBarProps.series} type="radialBar" height={350} />
        </div>
    )
}