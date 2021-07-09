import React, {useState, useEffect} from "react"
import searchData from "../../NearbySearch/searchData"
import SearchTable from '../../NearbySearch/SearchTable'
import SearchPropSelectors from '../../NearbySearch/SearchPropSelectors'
import SearchableMap from '../../GoogleMap/SearchableMap'
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

  const [searchResults, setSearchResults] = useState(searchData)

  useEffect(() => {
    async function getUsers() {
      try {
        let {data} = await axios.get(`/api/nearbySearch`)
        setSearchResults(data)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
  }, [])


  return (
    <div>
      <SearchPropSelectors />
      <SearchableMap data={searchResults}/>
      <SearchTable data={searchResults}/>
    </div>
  )
}
