import React, {useState, useEffect, useMemo} from "react"
import SearchTable from '../../NearbySearch/SearchTable/SearchTable'
import SearchableMap from '../../GoogleMap/SearchableMap'
import SearchForm from "../../NearbySearch/SearchForm/SearchForm"
import './ResourceSearch.css'

const axios = require('axios');

export default function ResourceSearch() {

  const [searchResults, setSearchResults] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [runSearch, setRunSearch] = useState(false)
  const [userLocation, setUserLocation] = useState(null)

  const sendDataFromForm = (data) => setApiUrl(data)
  const sendSearchStatusFromForm = (data) => setRunSearch(data)
  const sendLocationFromForm = (data) => setUserLocation(data)

  useEffect(() => {
    async function getUsers() {
      try {
        let {data} = await axios.get(`/api/textSearch/${apiUrl}`)
        setSearchResults(data)
        setRunSearch(false)
      } catch (error) {
        console.error(error)
      }
    }
    if (runSearch) {
      console.log('Running search')
      getUsers()
    }
  }, [apiUrl, runSearch])

  const data = useMemo(() => searchResults, [searchResults])
  console.log(data)

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <SearchForm setApiUrl={sendDataFromForm} setRunSearch={sendSearchStatusFromForm}  setUserLocation={sendLocationFromForm}/>
      </div>
      {data ?
        <div>
          <SearchableMap data={data} userLocation={userLocation}/>
          <SearchTable data={data}/>
        </div>
          : null}

    </div>
  )
}
