import React from 'react'

export default function ColumnFilter( {column} ) {

    const {filterValue, setFilter} = column
    return (
        <div>
            Search: {" "}
            <input
                className='recurring-payment-field transactions'
                value={filterValue || ""} 
                onChange={e => setFilter(e.target.value)} 
            />
        </div>
    )
}
