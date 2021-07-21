import React, { useState} from "react"
import Chart from 'react-apexcharts'

export default function RadialBar() {
    // eslint-disable-next-line
    const [radialBarProps, setRadialBarProps] = useState(
        {
            series: [70],
            options: {
                chart: {
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: '70%',
                    }
                    },
                },
                colors: ['#4CAF50'],
                labels: ['Monthly Budget'],
            },
        }
    )
    return (
        <div id="chart">
            <Chart options={radialBarProps.options} series={radialBarProps.series} type="radialBar" height={350} />
        </div>
    )
}