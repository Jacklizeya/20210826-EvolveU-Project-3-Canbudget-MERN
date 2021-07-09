import React, {useState} from "react"

export default function SearchPropSelectors() {

    const [searchType, setSearchType] = useState([])
    const [searchRadius, setSearchRadius] = useState([])

    return (
        <div>
            <div className='search-button-row'>
                <button type='button' onClick={() => setSearchType('accounting')}>Accounting</button>
                <button type='button' onClick={() => setSearchType('bank')}>Bank</button>
                <button type='button' onClick={() => setSearchType('insurance_agency')}>Insurance Agency</button>
                <button type='button' onClick={() => setSearchType('real_estate_agency')}>Real Estate Agency</button>
            </div>
            <div className='search-button-row'>
                <button type='button' onClick={() => setSearchRadius('2000')}>2 km</button>
                <button type='button' onClick={() => setSearchRadius('5000')}>5 km</button>
                <button type='button' onClick={() => setSearchRadius('10000')}>10 km</button>
                <button type='button' onClick={() => setSearchRadius('25000')}>25 km</button>
                <button type='button' onClick={() => setSearchRadius('50000')}>50 km</button>
                <button type='button' onClick={() => setSearchRadius('100000')}>100 km</button>
                <button type='button' onClick={() => setSearchRadius('250000')}>250 km</button>
            </div>
            {/*<form onSubmit={() => {
                setSearchResults()
                setSearchType()
                }
                }>
                <label for="type">Choose search type:</label>
                <select id='type' name='type'>
                    <option selected value='accounting'>Accounting</option>
                    <option value='bank'>Bank</option>
                    <option value='insurance_agency'>Insurance Agency</option>
                    <option value='real_estate_agency'>Real Estate Agency</option>
                </select>
                <label for="radius">Choose search radius:</label>
                <select id='radius' name='radius'>
                    <option select value='2000'>2 km</option>
                    <option value='5000'>5 km</option>
                    <option value='10000'>10 km</option>
                    <option value='25000'>25 km</option>
                    <option value='50000'>50 km</option>
                    <option value='100000'>100 km</option>
                    <option value='250000'>250 km</option>
                </select>
                <input type='submit' value='submit'></input>
            </form> */}
        </div>
    )
}