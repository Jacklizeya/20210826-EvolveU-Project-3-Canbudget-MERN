import React from 'react'

import StocksIcon from '../SubscriptionsTable/images/StocksIcon'

import DashboardStocksTimeseries from '../../ApexCharts/DashboardStocksTimeseries'

export default function StocksWidget({graphData}) {
    return (
        <div className='dashboard-container'>
            <div className='stocks message'>
                <h3>
                    Your portfolio is&nbsp; <p className='stocks-direction'>up!</p>
                </h3>
                <div><StocksIcon/></div>
                <h1 className='stocks-direction'>$213.76</h1>
                <p>Since your last visit</p>
            </div>
            <DashboardStocksTimeseries data={graphData}/>
        </div>
    )
}
