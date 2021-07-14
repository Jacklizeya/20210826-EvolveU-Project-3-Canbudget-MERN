import React, {useEffect, useState} from 'react';
import { usePosition } from './usePosition';

const GetLocationButton = () => {

  const watch = true;
  const {
    latitude,
    longitude,
    error
  } = usePosition(watch);

  const [locationFound, setLocationFound] = useState(false)

  const [errorFound, setErrorFound] = useState(false)

  const onButtonClick = (event) => {
    
  }

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
        <code>
          latitude: {latitude}<br/>
          longitude: {longitude}<br/>
          error: {error}
        </code>
      <button>Hello</button>
    </div>
  );
};

export default GetLocationButton