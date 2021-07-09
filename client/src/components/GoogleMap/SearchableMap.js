import React, {useState, useEffect} from "react"
import {
  GoogleMap,
  Marker,
  useLoadScript
} from "@react-google-maps/api"
import mapStyles from "./mapStyles"

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

export default function SearchableMap({data}) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries
  })

  const [mapCenter, setMapCenter] = useState({
    lat: 51.01,
    lng: -114.1
  })
  const [searchResults, setSearchResults] = useState(data)


  if (loadError) return "Error loading map"
  if (!isLoaded) return "Loading map"

  return (
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
                  key={marker.key}
                  position={{lat: parseFloat(marker.coordinates.lat), lng: parseFloat(marker.coordinates.lng)}}
                />
              )
            })}
          </GoogleMap>
    </div>
  )
}
