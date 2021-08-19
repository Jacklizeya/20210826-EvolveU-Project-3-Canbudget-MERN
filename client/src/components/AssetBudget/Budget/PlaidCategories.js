import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function PlaidCategories({parentUser}) {

  const [user, setUser] = useState({})

  useEffect(() => {
    async function getCategories() {
      let {data} = await axios.get(`/api/plaid/categories`)
      let categoryArray = []
      for (let i in data) {
        categoryArray.push(data[i].name)
        if (data[i].children.length > 0) {
          for (let j in data[i].children) {
            categoryArray.push(data[i].children[j].name)
            if (data[i].children[j].children.length > 0) {
              for (let k in data[i].children[j].children) {
                categoryArray.push(data[i].children[j].children[k])
              }
            }
          }
        }
      }
      categoryArray = [...new Set(categoryArray)]
      let categoryObjectArray = []
      for (let i in categoryArray) {
        categoryObjectArray.push({
          name: categoryArray[i],
          limit: 0
        })
      }
      setUser({...parentUser, plaidCategories: categoryObjectArray})
    }

    async function updateUser() {
      getCategories()
      console.log(user)
      let {data} = await axios.post(`api/user/`, user)
    }

    if (parentUser._id) {
      updateUser()
    }

},[parentUser])

  return (
    <div>
      
    </div>
  )
}
