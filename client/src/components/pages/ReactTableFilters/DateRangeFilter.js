import React, {useMemo} from 'react'

// This column is passing all the information to this component
export default function DateRangeFilter({column: { filterValue = [], preFilteredRows, setFilter, id }}) {

    const [min, max] = useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          value={filterValue[0] || ''}
          type="date"
          onChange={e => {
            const val = e.target.value
            console.log("min", val)
            setFilter((old = []) => [val ? val : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '150px',
            marginRight: '0.5rem',
          }}
        />
        to
        <input
          value={filterValue[1] || ''}
          type="date"
          onChange={e => {
            const val = e.target.value
            console.log("max", val)
            setFilter((old = []) => [old[0], val ? val : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '150px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    )
  }
  