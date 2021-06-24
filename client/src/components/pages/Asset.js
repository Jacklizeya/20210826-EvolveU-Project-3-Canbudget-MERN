import React, {useState, useEffect} from 'react';
import axios from "axios"

function Asset() {
    const [users, setUsers] = useState([])  
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [value, setValue] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [status, setStatus] = useState(0)
 

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get("/api/user", )
            console.log(data)
            setUsers(data)
        }
        getUsers()
        setStatus(0)
    }, [status])


    async function addNewBalanceSheet(event, id) {
        event.preventDefault()
        let newBalanceSheet = {name, type, value, changeMonthToMonth}
        console.log("newBalanceSheet", newBalanceSheet)
        let {data} = await axios.put(`/api/user/${id}/addBalanceSheet/`, newBalanceSheet, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setName("")
            setType("")
            setValue(0)
            setChangeMonthToMonth(0)
            setStatus(data.ok)
        }
    }
// right now only hook up one, wait until login is done 
 return (
    <>
        <h1> Asset </h1>
        {users? users.map((user, index) => (

            index === 0 ? 
            <div key={user.firstName + "Asset"}>
                {user.firstName}
                {user.lastName}
                {user.email}
                {user.address}
                {user.phoneNumber}


                
                    <table> 
                        <thead>
                            <tr key="itemname">
                                <th> item name </th>
                                <th> type </th>
                                <th> value </th>
                                <th> changeMonthToMonth </th>
                            </tr>
                        </thead>
                        <tbody>

                        {user.balanceSheet.map(
                            singleBalanceSheet => 

                            <tr key={singleBalanceSheet.name}>
                                <td> {singleBalanceSheet.name} </td>
                                <td> {singleBalanceSheet.type} </td>
                                <td> {singleBalanceSheet.value} </td>
                                <td> {singleBalanceSheet.changeMonthToMonth} </td>                   
                            </tr>
                            )} 

                        </tbody>                 
                    </table>    
                
                <br/> 
                <div className="form">
                    Add new item 
                    <form onSubmit={(event) => addNewBalanceSheet(event, user._id)}>
                        <label> Name of the item </label>
                        <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}/> <br/>
                        <label> Type </label>
                        <input type="text" value={type} onChange={(event)=>{setType(event.target.value)}}/> <br/>
                        
                        <label> value </label>
                        <input type="text" value={value} onChange={(event)=>{setValue(event.target.value)}}/> <br/>
                        <label> changeMonthToMonth </label>
                        <input type="text" value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                        
                        <button type="submit"> Submit </button>
                        <div> End of Form </div>
                    </form>
                </div>         
            </div> : ""
        )) : <div> No data yet </div>}
        
        </>
 )
}

export default Asset;