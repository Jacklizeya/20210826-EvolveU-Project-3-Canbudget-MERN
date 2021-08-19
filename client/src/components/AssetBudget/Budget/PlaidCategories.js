import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function PlaidCategories() {

  const [plaidCategories, setPlaidCategories] = useState([])

  useEffect(() => {
    async function getCategories() {
        let {data} = await axios.get(`/api/plaid/categories`)
        setPlaidCategories(data)
    }
    getCategories()
},[])

  return (
    <div>
      
    </div>
  )
}
