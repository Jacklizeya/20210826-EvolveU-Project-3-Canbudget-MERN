import React, {useEffect} from 'react'

// This column is passing all the information to this component
export default function DateRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id }}) {
 
    // The prefiltered rows is affected by other parameters, it WON't change for this componnet
    // The purpose of the following 5 lines is try to identify the boundary

    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[preFilteredRows.length-1].values[id] : undefined
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : undefined
        return [min, max];
    }, [id, preFilteredRows]);

//  React table doesnot allow to setFilter([min, max]) here, not quite sure why
//  This is the only way I find to store data
//  I need to initialize it in this way, very strange way....I am asking it on stackoverflow
    filterValue.push(min, max)
    // console.log("after push", filterValue)

    return (
        <div>
            <input
                className='recurring-payment-field'
                value={filterValue[0] || ""}
                type="date"
                min={min}
                onChange={e => {
                    const val = e.target.value;
                    console.log(e.target.value);
                    // Pass initial value to the Filter, the modify it
                    setFilter((old = [])=> [min, max])
                    setFilter((old = []) => [val ? (val) : undefined, old[1]]);
                }}
            />
            &nbsp;to&nbsp;
            <input
                className='recurring-payment-field'
                value={filterValue[1] || ""}
                type="date"
                max={max}
                onChange={e => {
                    const val = e.target.value;
                    setFilter((old = [])=> [min, max])
                    setFilter((old = []) => [old[0], val ? (val) : undefined]);
                }}
            />
        </div>
    );
}