import React, {useState, useEffect} from 'react';
import axios from "axios"


function Budget() {

    const [users, setUsers] = useState([])   
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [amount, setAmount] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [addStatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get("/api/user", )
            console.log(data)
            setUsers(data)
        }
        console.log("enter use Effect")
        getUsers()
        setAddStatus(0)
        setDeleteStatus(0)
    }, [addStatus, deleteStatus])

    async function addNewCashFlow(event, id) {
        event.preventDefault()
        let newCashFlow = {name: name.toLowerCase(), type, amount: Number(amount), changeMonthToMonth : Number(changeMonthToMonth), startDate, endDate}
        console.log("newCashFlow", newCashFlow)
        let {data} = await axios.put(`/api/user/${id}/addcashflow/`, newCashFlow, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setName("")
            setType("")
            setAmount(0)
            setChangeMonthToMonth(0)
            setStartDate("")
            setEndDate("")
            setAddStatus(data.ok)
        }
    }

async function deletecashflow(event, id) {
    let nameOfItemToRemove = event.target.value
    console.log(nameOfItemToRemove)
    let {data} = await axios.put(`/api/user/${id}/deletecashflow/`, {nameOfItemToRemove}, {headers : {"Content-Type": "application/json"}})
    if (data.ok) {
        setDeleteStatus(data.ok)
    }
}

    function editItem(event) {
    // continue tomorrow
    console.log("edit", users)
    let index = event.target.id
    // Right now I am using users[0], eventually it will be just one user, so need to fix this later
    let dataToEdit = users[0].cashFlow[index]
    console.log(dataToEdit)
    setName(dataToEdit.name)
    setType(dataToEdit.type)
    setAmount(dataToEdit.amount)
    setChangeMonthToMonth(dataToEdit.changeMonthToMonth)
    setStartDate(dataToEdit.startDate)
    setEndDate(dataToEdit.endDate)
}


// at line 46, right now I am only showing one, eventually will be changed, temporaray solution before we have login
 return (
    <>
        <h1> CashFlow </h1>
        {users? users.map((user, index) => (

            index ===  0 ? 
            <div className="eachUser" key={user.firstName}>
                {user.firstName}
                {user.lastName}
                {user.email}
                {user.address}
                {user.phoneNumber}

                    <table> 
                        <thead>
                            <tr>
                                <th> item name </th>
                                <th> type </th>
                                <th> amount </th>
                                <th> changeMonthToMonth </th>
                                <th> startDate </th>
                                <th> endDate </th>
                            </tr>
                        </thead>
                        <tbody>

                        {user.cashFlow.map(
                            (singleCashFlow, index) => 

                            <tr key={singleCashFlow.name + index}>
                                <td> {singleCashFlow.name} </td>
                                <td> {singleCashFlow.type} </td>
                                <td> {singleCashFlow.amount} </td>
                                <td> {singleCashFlow.changeMonthToMonth} </td>
                                <td> {singleCashFlow.startDate} </td>
                                <td> {singleCashFlow.endDate} </td>     
                                <td> 
                                    <a href="#form">
                                        <button id={index} onClick={editItem} > 
                                            Edit 
                                        </button>
                                    </a>
                                    

                                    
                                </td> 
                                <td>
                                    <button onClick={(event)=> deletecashflow(event, user._id)} value={singleCashFlow.name}>
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
                    <form onSubmit={(event) => addNewCashFlow(event, user._id)}>
                        <label> Name of the item </label>
                        <input type="text" required value={name} onChange={(event)=>{setName(event.target.value)}}/> <br/>
                        <label> Type </label>
                        <input type="text" required value={type} onChange={(event)=>{setType(event.target.value)}}/> <br/>
                        <label> amount </label>
                        <input type="text" required value={amount} onChange={(event)=>{setAmount(event.target.value)}}/> <br/>
                        <label> changeMonthToMonth </label>
                        <input type="text" required value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                        <label> startDate YYYY-MM-DD </label>
                        <input type="text" required value={startDate} onChange={(event)=>{setStartDate(event.target.value)}} /> <br/>
                        <label> endDate YYYY-MM-DD </label>
                        <input type="text" required value={endDate} onChange={(event)=>{setEndDate(event.target.value)}} /> <br/>
                        <button display="block" type="submit"> Submit </button>
                        <div> End of Form </div>
                    </form>
                </div>

                <br/>
                <div>
                        Cash flow at future time:  <input type="text"/> 
                </div>
                <br/>         
            </div> : ""
        )) : <div> No data yet </div>}
    
    
    </>
 )
}

export default Budget;