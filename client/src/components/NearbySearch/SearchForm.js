import React, {useState, useEffect} from 'react'
import './SearchForm.css'

export default function SearchForm() {

    const [searchProps, setSearchProps] = useState({
        type: 'banking',
        radius: '',
        address: ''

    })

    const [submitted, setSubmitted] = useState(false)

    const handleSearchTypeChange = (event) => {
        setSearchProps({...searchProps, type: event.target.value})
    }

    const handleRadiusInputChange = (event) => {
        setSearchProps({...searchProps, radius: event.target.value})
    }

    const handleAddressInputChange = (event) => {
        setSearchProps({...searchProps, address: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)
    }
    
    return (
        <div className="form-container">
            <form className="search-form" onSubmit={handleSubmit}>
                {submitted ? <div className="success-message">Success! Thank you for searching</div> : null}
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
                <input
                    onChange={handleAddressInputChange}
                    value={searchProps.address}
                    id="address"
                    className="form-field"
                    type="text"
                    placeholder="Address"
                    name="address"/>
                {/* Uncomment the next line to show the error message */}
                {/* <span id="address-error">Please enter an address</span> */}
                <button className="form-field" type="submit">
                Search
                </button>
            </form>
        </div>
    )
}




