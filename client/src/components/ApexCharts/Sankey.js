import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Chart } from "react-google-charts";
import { sankeyData } from './data/sankeyData';

export default function Sankey({userId}) {

  const [transactions, setTransactions] = useState(null)
  const [categories, setCategories] = useState(null)

  useEffect(() => {
      async function getData() {
          let {data} = await axios.get(`/api/user/${userId}`)
          setTransactions(data.transaction)
      }
      getData()
  },[])

  useEffect(() => {
      async function getCategories() {
          let {data} = await axios.get(`/api/plaid/categories`)
          setCategories(data)
      }
      getCategories()
  },[])

  return (
    <Chart
      width={600}
      height={'300px'}
      chartType="Sankey"
      loader={<div>Loading Chart</div>}
      data={sankeyData}
      rootProps={{ 'data-testid': '2' }}
    />
  )
}
