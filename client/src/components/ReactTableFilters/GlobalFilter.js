import React from 'react'

export default function GlobalFilter({globalfilter, setFilter}) {
    return (
        <div>
            Global Search: {" "}
            <input value={globalfilter || ""} onChange={e => setFilter(e.target.value)} />
        </div>
    )
}
