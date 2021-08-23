import React, {useEffect, useState} from 'react'

import './SubscriptionTable.css'

import HouseIcon from './images/HouseIcon'
import NetflixIcon from './images/NetflixIcon'
import SpotifyIcon from './images/SpotifyIcon'

export default function SubscriptionTable({data}) {

    const [rows, setRows] = useState(null)

    useEffect(() => {
        setRows(data)
    }, [data])

    return (
        <div className='subscription-table'>
            {rows ?
            <table>
                <tbody>
                    <tr className='subscription-table-title-row'>
                        <th>Icon</th><th>Name</th><th>Amount</th><th>Bill Date</th><th>Account</th><th>Frequency</th>
                    </tr>
                    {rows.map((row) => {
                        return (                                     
                            <tr key={row.name}>
                                <td>
                                    {
                                        row.name === 'Mortgage' ? <HouseIcon/> :
                                        row.name === 'Netflix' ? <NetflixIcon/> :
                                        row.name === 'Spotify' ? <SpotifyIcon/> :
                                        null
                                    }
                                </td>
                                <td><b>{row.name}</b></td>
                                <td>${row.amount}</td>
                                <td>{row.billDate}</td>
                                <td>{row.account}</td>
                                <td>{row.frequency}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> 
            : null}
        </div>
    )
}
