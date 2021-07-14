import React, {useState, useEffect, useMemo} from "react"
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript
} from "@react-google-maps/api"
import mapStyles from "./mapStyles"

const libraries = ["places"]
const mapContainerStyle = {
  width: "50vw",
  height: "685px",
  border: "4px solid #05386B",
  borderRadius: "20px",
  minWidth: "775px",
  boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)"
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}
const googleApiKey = 'AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY'

export default function SearchableMap({data, userLocation}) {
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries
  })

  const loadingMessage = [{name: 'Loading...', address: "This won't take long!", "coordinates":{"lat":"0","lng":"0"}}]
  const [markerList, setMarkerList] = useState(loadingMessage)

  const [mapCenter, setMapCenter] = useState({
    lat: 0,
    lng: 0
  })

  const [selectedMarker, setSelectedMarker] = useState(null)

  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation)
    } else if (data)
    setMapCenter(data[0].geometry.location)
  }, [userLocation, data])

  useEffect(() => {
    setMarkerList(data)
  }, [data])

  const markerData = useMemo(() => markerList, [markerList])

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
            {markerData.map(function (marker, index) {
              return (
                <Marker
                  key={marker.key}
                  title={marker.name}
                  position={{lat: parseFloat(marker.geometry.location.lat), lng: parseFloat(marker.geometry.location.lng)}}
                  onClick={() => {setSelectedMarker(marker)}}
                />
              )
            })}
            {selectedMarker ? 
            (<InfoWindow 
              position={{lat: selectedMarker.geometry.location.lat, lng: selectedMarker.geometry.location.lng}}
              onCloseClick={() => {setSelectedMarker(null)}}
              >
              <div>
                <h2>{selectedMarker.name}</h2>
                <p>{selectedMarker.address}</p>
                <p>{selectedMarker.rating}</p>
              </div>
            </InfoWindow>) 
            : null}
          </GoogleMap>
    </div>
  )
}
