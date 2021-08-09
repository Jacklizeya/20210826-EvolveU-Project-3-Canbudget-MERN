import React, {useState, useEffect} from 'react'

export default function DashboardTable({data}) {

    const [rows, setRows] = useState(null)
    const [sum, setSum] = useState(0)

    useEffect(() => {
        setRows(data)
        for (let index in data) {
            setSum(s => s + data[index].value)
        }
    }, [data])

    return (
        <div className='dashboard-container' style={{justifyContent:'center'}}>
            <div className='subscription-table'>
                {rows ?
                <table>
                    <tbody>
                        <tr className='subscription-table-title-row'>
                            <th>Name</th><th>Value</th><th>Monthly Change</th><th>Type</th>
                        </tr>
                        {rows.map((row) => {
                            return (                                     
                                <tr key={row.name}>
                                    <td><b>{row.name}</b></td>
                                    <td>${row.value}</td>
                                    <td>{row.changeMonthToMonth}</td>                                
                                    <td>{row.type}</td>
                                </tr>
                            )
                        })}
                        <tr className='subscription-table-title-row'>
                            <th>Sum</th><th>{sum}</th><th></th><th></th>
                        </tr>
                    </tbody>
                </table> 
                : null}
            </div>
        </div>
    )
}
