import React from 'react'

// This column is passing all the information to this component
export default function NumberRangeFilter({column: { filterValue = [], preFilteredRows, setFilter, id }}) {

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
          min = Math.min(row.values[id], min)
          max = Math.max(row.values[id], max)
        })
        return [min, max]
      }, [id, preFilteredRows])

      // console.log("NumberFilter", filterValue)
    
      return (
        <div
          style={{
            display: 'flex',
          }}
        >
          <input
            value={filterValue[0] || ''}
            type="number"
            onChange={e => {
              const val = e.target.value
              setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
            }}
            placeholder={`Min (${min})`}
            style={{
              width: '100px',
              marginRight: '0.5rem',
            }}
          />
          to
          <input
            value={filterValue[1] || ''}
            type="number"
            onChange={e => {
              const val = e.target.value
              // going to do a test, see are they on the same pace?
              setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
            }}
            placeholder={`Max (${max})`}
            style={{
              width: '100px',
              marginLeft: '0.5rem',
            }}
          />
        </div>
      )
    }