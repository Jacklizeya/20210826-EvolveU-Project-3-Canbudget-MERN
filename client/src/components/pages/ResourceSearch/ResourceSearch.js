import React, {useState, useEffect, useMemo} from "react"
import SearchTable from '../../NearbySearch/SearchTable'
import SearchableMap from '../../GoogleMap/SearchableMap'
import SearchForm from "../../NearbySearch/SearchForm"
import './ResourceSearch.css'

const axios = require('axios');

const googleApiKey = 'AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY'
// Search Parameters
let searchLat = 51.042642417966455
let searchLng = -114.06990000957333
let searchRadius = 10000 // Measured in m
let searchType = 'bank'

let nearbySearchURL = ('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  +'key='+googleApiKey
  +'&location='+searchLat+','+searchLng
  +'&radius='+searchRadius
  +'&type='+searchType)

export default function ResourceSearch() {

  const [searchResults, setSearchResults] = useState(null)
  const [apiUrl, setApiUrl] = useState(null)
  const [runSearch, setRunSearch] = useState(false)

  const sendDataFromForm = (data) => setApiUrl(data)
  const sendSearchStatusFromForm = (data) => setRunSearch(data)

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
      <SearchForm setApiUrl={sendDataFromForm} setRunSearch={sendSearchStatusFromForm}/>
      {data ?
        <div>
          <SearchableMap data={data}/>
          <SearchTable data={data}/>
        </div>
          : null}

    </div>
  )
}
