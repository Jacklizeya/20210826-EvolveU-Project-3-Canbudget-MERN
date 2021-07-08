import React, {useState, useEffect} from "react"
import {
  GoogleMap,
  useLoadScript
} from "@react-google-maps/api"
import mapStyles from "./mapStyles"

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

export default function SearchableMap() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries
  })

  const [searchCategory, setSearchCategory] = useState(null)
  const [mapCenter, setMapCenter] = useState({
    lat: 51.01,
    lng: -114.1
  })
  const [searchResults, setSearchResults] = useState()

  useEffect(() => {
    async function getUsers() {
      console.log(nearbySearchURL)
      try {
        let data = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY&location=51.042642417966455,-114.06990000957333&radius=10000&type=bank')
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    getUsers()
}, [])

  if (loadError) return "Error loading map"
  if (!isLoaded) return "Loading map"

  return (
      <div>
        {/*<div style={{display:'flex',justifyContent:'space-around'}}>
            <button type='button' onClick="setSearchCategory('accounting')">Accounting</button>
            <button type='button' onClick="setSearchCategory('bank')">Bank</button>
            <button type='button' onClick="setSearchCategory('insurance_agency')">Insurance Agency</button>
            <button type='button' onClick="setSearchCategory('real_estate_agency')">Real Estate Agency</button>
        </div>*/}
        <div style={{display:'flex',justifyContent:'center',padding:'20px'}}>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10.5}
            center={mapCenter}
            options={options}
        >
        </GoogleMap>
        </div>
    </div>
  )
}
