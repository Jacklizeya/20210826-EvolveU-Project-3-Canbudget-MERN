import React, {useState, useEffect} from "react"
import Chart from 'react-apexcharts'

export default function RadialBar({budgetSum, transactionSum}) {
    // eslint-disable-next-line
    const [radialBarProps, setRadialBarProps] = useState(
        {
            series: [94.5],
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

    useEffect(() => {
        if (budgetSum && transactionSum) {
            let budgetPercentage = (transactionSum / budgetSum * -100).toFixed(1)
            if (budgetPercentage > 100) {
                budgetPercentage = 100
            }
            setRadialBarProps(r => ({...r, series: [budgetPercentage]}))
        }
    },[budgetSum, transactionSum])

    return (
        <div id="chart">
            <Chart options={radialBarProps.options} series={radialBarProps.series} type="radialBar" height={350} />
        </div>
    )
}