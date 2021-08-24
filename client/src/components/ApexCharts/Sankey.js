import React, {useState, useEffect} from 'react'
import axios from 'axios';

import handleSankeyData from './data/handleSankeyData';
import { Chart } from "react-google-charts";
import { mockData } from './data/sankeyData'

export default function Sankey({userId, filteredData}) {

  const [transactions, setTransactions] = useState(null)
  const [incomes, setIncomes] = useState(null)
  // const [categories, setCategories] = useState(null)
  const [sankeyData, setSankeyData] = useState([])

  useEffect(() => {
    async function getData() {
      let {data} = await axios.get(`/api/user/${userId}`)
      let incomeArray = []
      for (let i in data.cashFlow) {
        if (data.cashFlow[i].type === 'income') {
          incomeArray.push(data.cashFlow[i])
        }
      }
      setIncomes(incomeArray)
      setTransactions(data.transaction)
    }
    getData()
  },[userId])

  useEffect(() => {
    if (transactions) {
      let sankeyArray = handleSankeyData(transactions, incomes)
      if (sankeyArray.length !== 1) {
        setSankeyData(sankeyArray)
      }
    }
  },[transactions, incomes])

  useEffect(() => {
    let filteredTransactions = []
    for (let i in filteredData) {
      filteredTransactions.push(filteredData[i].values)
    }
    setTransactions(filteredTransactions)
  },[filteredData])

  // useEffect(() => {
  //     async function getCategories() {
  //         let {data} = await axios.get(`/api/plaid/categories`)
  //         setCategories(data)
  //     }
  //     getCategories()
  // },[])

  return (
    filteredData ?
      <div style={{display:'flex', alignItems: 'center', justifyContent:'center', width:'50%'}}>
        <Chart
          chartType="Sankey"
          width={'90%'}
          height={'90%'}
          loader={<div>Loading Chart</div>}
          data={sankeyData}
        /> 
      </div>
    : null
  )
}
