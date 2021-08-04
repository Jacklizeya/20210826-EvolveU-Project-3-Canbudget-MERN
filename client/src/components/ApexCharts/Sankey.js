import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Chart } from "react-google-charts";
import { mockData } from './data/sankeyData'

export default function Sankey({userId}) {

  const [transactions, setTransactions] = useState(null)
  const [categories, setCategories] = useState(null)
  const [sankeyData, setSankeyData] = useState(mockData)

  useEffect(() => {
    async function getData() {
      let {data} = await axios.get(`/api/user/${userId}`)
      setTransactions(data.transaction)
    }
    getData()
  },[])

  useEffect(() => {
    function createTransactionArray() {
      let transactionArray = []
      let parentNodes = []
      for (let i in transactions) {
        let transactionCategories = transactions[i].category.split(", ")
        parentNodes.push(transactionCategories[0])
        let transactionObject = {
          firstNode: transactionCategories[0] ? transactionCategories[0] : null,
          secondNode: transactionCategories[1] ? transactionCategories[1] : null,
          thirdNode: transactionCategories[2] ? transactionCategories[2] : null,
          amount: transactions[i].amount
        }
        transactionArray.push(transactionObject)
      }
      parentNodes = [...new Set(parentNodes)]
      let newParentNodes = []
      for (let parent in parentNodes) {
        let parentArray = []
        for (let i in transactionArray) {
          if (parentNodes[parent] === transactionArray[i].firstNode) {
            parentArray.push(transactionArray[i])
          }
        }
        newParentNodes[parentNodes[parent]] = parentArray
      }
      parentNodes = newParentNodes
      let sankeyArray = [['From', 'To', 'Weight']]
      for (let parent in parentNodes) {
        for (let i in parentNodes[parent]) {
          if ((parentNodes[parent][i].firstNode !== 'Transfer') && (parentNodes[parent][i].firstNode !== 'Payment') & (parentNodes[parent][i].amount < 0)) {
            sankeyArray.push([parentNodes[parent][i].firstNode, parentNodes[parent][i].secondNode, parentNodes[parent][i].amount * -1])
          }
        }
      }
      setSankeyData(sankeyArray)
    }
    createTransactionArray()
  },[transactions])

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
