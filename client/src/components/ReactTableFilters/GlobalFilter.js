import React from 'react'

export default function GlobalFilter({globalfilter, setFilter}) {
    return (
        <div>
            Global Search: {" "}
            <input
                className='recurring-payment-field'
                value={globalfilter || ""} 
                onChange={e => setFilter(e.target.value)} 
            />
        </div>
    )
}
