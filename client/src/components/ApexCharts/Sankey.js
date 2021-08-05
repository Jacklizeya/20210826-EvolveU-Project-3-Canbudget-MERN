import React, {useState, useEffect} from 'react'
import axios from 'axios';

import handleSankeyData from './data/handleSankeyData';
import { Chart } from "react-google-charts";
import { mockData } from './data/sankeyData'

export default function Sankey({userId, filteredData}) {

  const [transactions, setTransactions] = useState(null)
  const [incomes, setIncomes] = useState(null)
  const [categories, setCategories] = useState(null)
  const [sankeyData, setSankeyData] = useState(mockData)

  useEffect(() => {
    async function getData() {
      let {data} = await axios.get(`/api/user/${userId}`)
      let incomeArray = []
      for (let i in data.cashFlow) {
        if (data.cashFlow[i].type === 'income') {
          console.log(data.cashFlow[i])
          incomeArray.push(data.cashFlow[i])
        }
      }
      setIncomes(incomeArray)
      setTransactions(data.transaction)
    }
    getData()
  },[])

  useEffect(() => {
    if (transactions) {
      let sankeyArray = handleSankeyData(transactions, incomes)
      setSankeyData(sankeyArray)
    }
  },[transactions])

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
    sankeyData ? <Chart
      width={600}
      height={'300px'}
      chartType="Sankey"
      loader={<div>Loading Chart</div>}
      data={sankeyData}
      rootProps={{ 'data-testid': '2' }}
    /> : null
  )
}
