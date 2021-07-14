import React, {useState, useEffect} from 'react'
import './SearchForm.css'
import { usePosition } from '../Geolocation/usePosition'

//'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+type+address+'&key='YOUR_API_KEY

export default function SearchForm({ 
    setApiUrl,
    setRunSearch,
    setUserLocation
}) {

    const watch = true;
    const {
      latitude,
      longitude,
      error
    } = usePosition(watch);

    const [searchProps, setSearchProps] = useState({
        type: 'banking',
        radius: '',
        address: '',
        latitude: '',
        longitude: '',
        city: '',
        province: 'AB'
    })

    const [locationActive, setlocationActive] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [valid, setValid] = useState(false)


    useEffect(() => {
        if (latitude && longitude) {
            setSearchProps({...searchProps, latitude: latitude, longitude: longitude})
            setlocationActive(true)
            setUserLocation({lat:latitude, lng: longitude})
        }
    }, [latitude, longitude])

    const handleSearchTypeChange = (event) => {
        setSearchProps({...searchProps, type: event.target.value})
    }

    const handleRadiusInputChange = (event) => {
        setSearchProps({...searchProps, radius: event.target.value})
    }

    const handleAddressInputChange = (event) => {
        setSearchProps({...searchProps, address: event.target.value})
    }

    const handleCityInputChange = (event) => {
        setSearchProps({...searchProps, city: event.target.value})
    }

    const handleProvinceInputChange = (event) => {
        setSearchProps({...searchProps, province: event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)

        const checkIfValid = () => {
            let radiusString = searchProps.radius ? '&radius='+(searchProps.radius*1000) : ''

            if (locationActive) {
                if (searchProps.radius && searchProps.latitude && searchProps.longitude) {
                    setApiUrl(searchProps.type+'&location='+searchProps.latitude+','+searchProps.longitude+radiusString)
                    setValid(true)
                    setRunSearch(true)
                }
            } else {
                if (searchProps.address && searchProps.city && searchProps.province) {
                    setApiUrl(searchProps.type+'+near+'+searchProps.address.replace(/\s/g,'+')+'+'+searchProps.city.replace(/\s/g,'')+'+'+searchProps.province+radiusString)
                    setValid(true)
                    setRunSearch(true)
                }
            }
        }

        checkIfValid()
    }
    
    return (
        <div className="form-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <div style={{display: 'flex', flexDirection: 'column', width: '60vw'}}>
                    <div className='form-row'>
                        <select 
                            id='category' 
                            name='category' 
                            value={searchProps.type} 
                            onChange={handleSearchTypeChange}
                        >
                            <option value='financial+planner'>Financial Planning</option>
                            <option value='mortgage+broker'>Mortgage Broker</option>
                            <option value='bank'>Banking</option>
                            <option value='insurance+agency'>Insurance Agency</option>
                            <option value='real+estate+agency'>Real Estate Agency</option>
                            <option value='investment+advisor'>Investment Advisor</option>
                        </select>
                        <input
                            onChange={handleRadiusInputChange}
                            value={searchProps.radius}
                            id="radius"
                            className="form-field"
                            type="text"
                            placeholder="Radius (km)"
                            name="radius"/>
                        {locationActive && submitted && !searchProps.radius ? 
                            <span id="radius-error">Please enter a radius</span> : null
                        }
                    </div>
                    {locationActive ? null : 
                        <div className='form-row'>
                            <input
                                onChange={handleAddressInputChange}
                                value={searchProps.address}
                                id="address"
                                className="form-field"
                                type="text"
                                placeholder="Address"
                                name="address"/>
                            {submitted && !searchProps.address ? 
                                <span id="address-error">Please enter an address</span> : null
                            }
                            <input
                                onChange={handleCityInputChange}
                                value={searchProps.city}
                                id="city"
                                className="form-field"
                                type="text"
                                placeholder="City"
                                name="city"/>
                            {submitted && !searchProps.city ? 
                                <span id="city-error">Please enter a city</span> : null
                            }
                            <select 
                                id='province' 
                                name='province' 
                                value={searchProps.province} 
                                onChange={handleProvinceInputChange}
                            >
                                <option value='AB'>AB</option>
                                <option value='BC'>BC</option>
                                <option value='MB'>MB</option>
                                <option value='NB'>NB</option>
                                <option value='NL'>NL</option>
                                <option value='NWT'>NWT</option>
                                <option value='NS'>NS</option>
                                <option value='NU'>NU</option>
                                <option value='ON'>ON</option>
                                <option value='PEI'>PEI</option>
                                <option value='QU'>QU</option>
                                <option value='SK'>SK</option>
                                <option value='YU'>YU</option>
                            </select>
                        </div>
                    }
                </div>
                <button className="form-field" type="submit">
                Search
                </button>
            </form>
            {submitted && valid ? <div className="success-message">Success! Thank you for searching</div> : null}
        </div>
    )
}




