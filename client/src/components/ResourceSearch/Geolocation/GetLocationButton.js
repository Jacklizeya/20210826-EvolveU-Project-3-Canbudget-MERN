import React from 'react';
import { usePosition } from './usePosition';

const GetLocationButton = () => {

  const watch = true;
  const {
    latitude,
    longitude,
    error
  } = usePosition(watch)

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
        <code>
          latitude: {latitude}<br/>
          longitude: {longitude}<br/>
          error: {error}
        </code>
      <button>Hello</button>
    </div>
  )
}

export default GetLocationButton