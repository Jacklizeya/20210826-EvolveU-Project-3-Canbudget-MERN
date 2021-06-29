import React, {useState, useEffect} from 'react';
import axios from "axios"

function Asset() {
    const [users, setUsers] = useState([])  
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [value, setValue] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [addstatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get("/api/user", )
            console.log(data)
            setUsers(data)
        }
        getUsers()
        setAddStatus(0)
        setDeleteStatus(0)
    }, [addstatus, deleteStatus])


    async function addNewBalanceSheet(event, id) {
        event.preventDefault()
        let newBalanceSheet = {name: name.toLowerCase(), type, value: Number(value), changeMonthToMonth: Number(changeMonthToMonth)}
        console.log("newBalanceSheet", newBalanceSheet)
        let {data} = await axios.put(`/api/user/${id}/addBalanceSheet/`, newBalanceSheet, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setName("")
            setType("")
            setValue(0)
            setChangeMonthToMonth(0)
            setAddStatus(data.ok)
        }
    }

    async function deleteBalanceSheet(event, id) {
        let nameOfItemToRemove = event.target.value
        console.log(nameOfItemToRemove)
        let {data} = await axios.put(`/api/user/${id}/deletebalancesheet/`, {nameOfItemToRemove}, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setDeleteStatus(data.ok)
        }
    }

    function editItem(event) {
    // continue tomorrow
    console.log("edit", users, event.target.id)
    let index = event.target.id
    // Right now I am using users[0], eventually it will be just one user, so need to fix this later
    let dataToEdit = users[0].balanceSheet[index]
    console.log(dataToEdit)
    setName(dataToEdit.name)
    setType(dataToEdit.type)
    setValue(dataToEdit.value)
    setChangeMonthToMonth(dataToEdit.changeMonthToMonth)
    }


// right now only hook up one, wait until login is done 
 return (
    <>
        <h1> Asset </h1>
        {users? users.map((user, index) => (

            index ===  0 ? 
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
                            (singleBalanceSheet, index) => 

                            <tr key={singleBalanceSheet.name}>
                                <td> {singleBalanceSheet.name} </td>
                                <td> {singleBalanceSheet.type} </td>
                                <td> {singleBalanceSheet.value} </td>
                                <td> {singleBalanceSheet.changeMonthToMonth} </td>    
                                <td> 
                                    <a href="#form">
                                        <button id={index} onClick={editItem} > 
                                            Edit 
                                        </button>
                                    </a>
                                    

                                    
                                </td> 
                                <td>
                                    <button onClick={(event)=> deleteBalanceSheet(event, user._id)} value={singleBalanceSheet.name}>
                                    delete 
                                    </button> 
                                </td>     
                                


                            </tr>
                            )} 

                        </tbody>                 
                    </table>    
                
                <br/> 
                <div className="form" id="form">
                    Add new item/Edit existing item 
                    <form onSubmit={(event) => addNewBalanceSheet(event, user._id)}>
                        <label> Name of the item </label>
                        <input type="text" required value={name} onChange={(event)=>{setName(event.target.value)} }/> <br/>

                        <label> Type </label>
                        <input type="text" required value={type} onChange={(event)=>{setType(event.target.value)}}/> <br/>
                        
                        <label> value </label>
                        <input type="text" required value={value} onChange={(event)=>{(setValue(event.target.value))}}/> <br/>
                        <label> changeMonthToMonth </label>
                        <input type="text" required value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                        
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