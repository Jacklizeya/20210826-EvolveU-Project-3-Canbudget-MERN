import React, {useState, useEffect} from "react"
import {
  GoogleMap,
  Marker,
  useLoadScript
} from "@react-google-maps/api"
import mapStyles from "./mapStyles"
import './SearchableMap.css'
import searchData from "./searchData"
import SearchTable from './SearchTable'
import SearchPropSelectors from './SearchPropSelectors'

console.log(searchData)

const axios = require('axios');

const libraries = ["places"]
const mapContainerStyle = {
  width: "50vw",
  height: "685px",
  border: "4px solid #05386B",
  borderRadius: "20px",
  minWidth: "775px"
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}
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

const apiRoute = '/api/nearbySearch'+'/key='+googleApiKey+'&location='+searchLat+','+searchLng+'&radius='+searchRadius+'&type='+searchType

export default function SearchableMap() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries
  })

  const [mapCenter, setMapCenter] = useState({
    lat: 51.01,
    lng: -114.1
  })
  const [searchResults, setSearchResults] = useState(searchData)

  useEffect(() => {
    async function getUsers() {
        let {results} = await axios.get(nearbySearchURL, )
        console.log(results)
    }
    getUsers()
}, [])

  if (loadError) return "Error loading map"
  if (!isLoaded) return "Loading map"

  return (
      <div>
        <SearchPropSelectors />
        <div className='nearby-search-map'>
          <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={11.5}
              center={mapCenter}
              options={options}
          >
            {searchResults.map(function (marker, index) {
              return (
                <Marker
                  key={marker.name}
                  position={{lat: parseFloat(marker.coordinates.lat), lng: parseFloat(marker.coordinates.lng)}}
                />
              )
            })}
          </GoogleMap>
        </div>
        <SearchTable data={searchResults}/>
    </div>
  )
}
