import React from 'react'

import StocksIcon from '../SubscriptionsTable/images/StocksIcon'

export default function StocksWidget() {
    return (
        <div className='dashboard-container stocks'>
            <div className='stocks left'>
                <h3 className='stocks heading'>
                    Your portfolio is&nbsp; <p className='stocks-direction'>up!</p>
                </h3>
                <div><StocksIcon/></div>
                <h1 className='stocks-direction'>$213.76</h1>
                <p>Since your last visit</p>
            </div>
        </div>
    )
}
