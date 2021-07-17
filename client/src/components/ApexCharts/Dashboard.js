import React, {useEffect, useContext, useState} from 'react'
import AuthenticationContext from '../auth/AuthenticationContext'
import axios from 'axios'
import Donut from './Donut'
import Line from './Line'

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
        <div style={{display:'flex', justifyContent:'space-between', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)', borderRadius:'20px', padding:'20px', margin:'20px'}}>
            {user ? <Donut data={assets} /> : null}
            <Line />
            {user ? <Donut data={liability} /> : null}
        </div>
    )
}
