import React from 'react'

export default function GlobalFilter({globalfilter, setFilter}) {
    return (
        <div>
            <span>
                Global Search: {" "}
                <input value={globalfilter || ""} onChange={e => setFilter(e.target.value)} />
            </span>
        </div>
    )
}
