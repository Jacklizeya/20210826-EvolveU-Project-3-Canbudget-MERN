import React, {useEffect, useContext, useState} from 'react'
import {NavLink} from 'react-router-dom'
import AuthenticationContext from '../../components/auth/AuthenticationContext'
import axios from 'axios'

import Donut from '../../components/ApexCharts/Donut'
import Line from '../../components/ApexCharts/Line'
import RadialChart from '../../components/ApexCharts/RadialBar'

import DashboardTable from '../../components/Dashboard/DashboardTable'

import SubscriptionTable from '../../components/Dashboard/SubscriptionsTable/SubscriptionTable'

import StocksWidget from '../../components/Dashboard/StocksWidget/StocksWidget'
import portfolioWorthData from '../../components/ApexCharts/data/portfolioWorthData'

import './Dashboard.css'


// https://apexcharts.com/docs/options/theme/ Apex-Charts Colors


export default function Dashboard() {
    
    const {id} = useContext(AuthenticationContext)
    const [user, setUser] = useState(null)
    const [assets, setAssets] = useState(null)
    const [liability, setLiability] = useState(null)
    const [whichTable, setWhichTable] = useState(null)

    useEffect(() => {

        async function getData() {
            let {data} = await axios.get(`/api/user/${id}`)
            setUser(data)
        }
        getData()
      },[id])

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

    const handleAssetsClick = (event) => {
        if (whichTable === 'assets') {
            setWhichTable(null)
        } else {
            setWhichTable('assets')
        }
    }
    const handleOverviewClick = (event) => {
        if (whichTable === 'overview') {
            setWhichTable(null)
        } else {
            setWhichTable('overview')
        }
    }
    const handleBudgetClick = (event) => {
        if (whichTable === 'liabilities') {
            setWhichTable(null)
        } else
            setWhichTable('liabilities')
    }
    
    return (
        user ?
            <div className='dashboard'> 
                <h1 className='dashboard-header dashboard-header-text'>Welcome back {user.firstName}!</h1>
                <div className='dashboard-container'>
                    <div className='graph-container'>
                        <Donut data={assets} showLegend={false} />
                        <button className='dashboard-dropdown-button' onClick={handleAssetsClick}><h2 className='dashboard-label-text'>Assets</h2></button>
                    </div>  
                    <div className='graph-container'>
                        <Line />
                        <button className='dashboard-dropdown-button' onClick={handleOverviewClick}><h2 className='dashboard-label-text'>Overview</h2></button>
                    </div>
                    <div className='graph-container'>
                        <Donut data={liability} showLegend={false} />
                        <button className='dashboard-dropdown-button' onClick={handleBudgetClick}><h2 className='dashboard-label-text'>Liabilities</h2></button>
                    </div>
                </div>
                {
                    whichTable === 'assets' ? <DashboardTable data={assets}/> :
                    whichTable === 'liabilities' ? <DashboardTable data={liability}/> :
                    whichTable === 'overview' ? <DashboardTable data={user.balanceSheet}/> :
                    null
                }
                <div className='dashboard-widget-row'>
                    <div className='dashboard-container subscriptions'>
                        <h2 className='dashboard-label-text'>Upcoming bills...</h2>
                        <SubscriptionTable data={user.recurringBills}/>
                    </div>
                    <StocksWidget graphData={portfolioWorthData}/>
                    <div className='dashboard-container'>
                        <RadialChart />
                    </div>
                </div>
                <div className='dashboard-widget-row'>
                    <NavLink to="/onboard">
                        <button className='nav-link-button'>
                            Go to Onboarding Wizard
                        </button>
                    </NavLink>
                </div>
            </div>
        : null 
    )
}
