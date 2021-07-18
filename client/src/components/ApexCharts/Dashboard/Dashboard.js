import React, {useEffect, useContext, useState} from 'react'
import AuthenticationContext from '../../auth/AuthenticationContext'
import axios from 'axios'

import Donut from '../Donut'
import Line from '../Line'

import SubscriptionTable from './SubscriptionsTable/SubscriptionTable'
import { subscriptionTableData } from '../data/mockData'

import './Dashboard.css'

// https://apexcharts.com/docs/options/theme/ Apex-Charts Colors


export default function Dashboard() {

    const {id} = useContext(AuthenticationContext)

    const [user, setUser] = useState(null)
    const [assets, setAssets] = useState(null)
    const [liability, setLiability] = useState(null)

    useEffect(() => {

        async function getData() {
            let {data} = await axios.get(`/api/user/${id}`)
            setUser(data)
        }
        getData()
      },[])

    useEffect(() => {
        let assetList = []
        let liabilityList = []
        if (user) {
            for (let index in user.balanceSheet) {
                if (user.balanceSheet[index].type === 'asset') {
                    assetList.push(user.balanceSheet[index])
                } else if (user.balanceSheet[index].type === 'liability') {
                    liabilityList.push(user.balanceSheet[index])
                }
            }
            assetList.sort(function (a, b) {
                return b.value - a.value;
              })
            liabilityList.sort(function (a, b) {
                return a.value - b.value;
              })
            setAssets(assetList)
            setLiability(liabilityList)
        }
    }, [user])


    return (
        user ?
            <div> 
                <h1 className='dashboard-header'>Welcome back {user.firstName}!</h1>
                <div className='dashboard-container'>
                    <div>
                        <Donut data={assets} />
                        <h3>Assets</h3>
                    </div>  
                    <div>
                        <Line />
                        <h3>Overview</h3>
                    </div>
                    <div>
                        <Donut data={liability} />
                        <h3>Liabilities</h3>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div className='dashboard-container subscriptions'>
                        <h3>Upcoming bills...</h3>
                        <SubscriptionTable data={subscriptionTableData}/>
                    </div>
                    <div className='dashboard-container'></div>
                </div>
            </div>
        : null 
    )
}
