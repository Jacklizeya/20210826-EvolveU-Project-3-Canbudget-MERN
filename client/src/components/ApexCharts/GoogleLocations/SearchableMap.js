import React, {onLoad, onPlacesChanged, useState} from "react"
import {
  GoogleMap,
  StandaloneSearchBox,
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

export default function SearchableMap() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY',
    libraries
  })

  const [mapCenter, setMapCenter] = useState( {
    lat: 51.01,
    lng: -114.1
  })

  if (loadError) return "Error loading map"
  if (!isLoaded) return "Loading map"

  return (
    <div style={{display:'flex',justifyContent:'center',padding:'20px'}}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10.5}
        center={mapCenter}
        options={options}
      >
        <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={
                onPlacesChanged
            }
        >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
      />
    </StandaloneSearchBox>
      </GoogleMap>
    </div>
  )
}
