import React, { useState, useEffect } from "react"
import axios from "axios"
import Chart from 'react-apexcharts'
import { donutData } from '../data/apexDataConvertor'
import './AssetDashboard.css'

export default function AssetDashboard() {

  /// const [users, setUsers] = useState([])      Don't need until users in db
  const [labels, setLabels] = useState(donutData.labels)
  const [values, setValues] = useState(donutData.series)
  const [rows, setRows] = useState([])
  const [donutProps, setDonutProps] = useState({
    options: {
      labels: labels,
    },
    series: values,
    width: 600
  })
  

  useEffect(() => {
    async function getData() {
        const {data} = await axios.get("/api/user")
        const user = data[0] /// Only selecting one user right now
        let labelsList = []
        let valuesList = []
        let tableData = []
        for (const index in user.balanceSheet) {
          if (user.balanceSheet[index].type === 'asset' ) {
            labelsList.push(user.balanceSheet[index].name)
            valuesList.push(user.balanceSheet[index].value)
            tableData.push(user.balanceSheet[index])
          }
        }
        setRows(tableData)
        setLabels(labelsList)
        setValues(valuesList)
    }
    getData()
  },[])

  useEffect(() => {
    function updateGraph() {
      setDonutProps({
        options: {
          labels: labels,
        },
        series: values,
        width: 600
      })
    }
    updateGraph()
  },[labels,values])

    return (
      <div className='dashboard-container'>
        <h2 className='dashboard-heading'>Assets</h2>
        <div className='dashboard-content'>
          <div className="asset-table">
            <table>
                <tbody>
                  <tr><th>Name</th><th>Value</th></tr>
                  {rows.map((row) => {
                      return (                                     
                        <tr key={row.name} >
                            <td>{row.name}</td>
                            <td>{row.value}</td>
                        </tr>
                      )
                  })}                
                </tbody>
            </table>
          </div>
          <Chart 
            options={donutProps.options} 
            series={donutProps.series} 
            type="donut" 
            width={donutProps.width} 
          />
        </div>
      </div>
    )
}