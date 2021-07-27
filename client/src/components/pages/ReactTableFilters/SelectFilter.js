import React, {useMemo} from 'react'

export default function SelectFilter({column}) {
    const { filterValue, setFilter, preFilteredRows, id } = column

    const options = useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
          options.add(row.values[id])
        })
        return [...options.values()]
      }, [id, preFilteredRows])

    return (
        <div>
            <select
            value={filterValue}
            onChange={e => {
            setFilter(e.target.value || undefined)
            }}>
                <option value="">All</option>
                {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
                ))}
            </select>
        </div>
    )
}
