import React, {useState, useEffect} from 'react';
import axios from "axios"
import {Button, Tablediv, Descriptiondiv, Heading1, FormDiv, TableBottomData} from "./assetAndBudget.elements"

function Budget() {

    const [users, setUsers] = useState([])   
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [amount, setAmount] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [addStatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)

    const [sortDirection, setSortDirection] = useState(1)

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get("/api/user", )
            console.log(data)
            setUsers(data)
            setUser(data[0])
            console.log("user", user)
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
    }}

    function editItem(event) {
    // continue tomorrow
    console.log("edit", users)
    let index = event.target.id
    // Right now I am using users[0], eventually it will be just one user, so need to fix this later
    let dataToEdit = user.cashFlow[index]
    console.log(dataToEdit)
    setName(dataToEdit.name)
    setType(dataToEdit.type)
    setAmount(dataToEdit.amount)
    setChangeMonthToMonth(dataToEdit.changeMonthToMonth)
    setStartDate(dataToEdit.startDate)
    setEndDate(dataToEdit.endDate)
}

    function sortArrayBy(event) {
        console.log("I want to sort by", event.target.id)
        let userCopy = {...user}
        userCopy.cashFlow.sort(
            (a,b)=>{
                    if (event.target.id === "amount") {setSortDirection(sortDirection * -1); console.log(sortDirection); return (a[event.target.id]-b[event.target.id]) * sortDirection} 
                    else { setSortDirection(sortDirection * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirection}
            }
            )
        console.log(userCopy)
        setUser(userCopy)
        console.log(user)
    }

// at line 46, right now I am only showing one, eventually will be changed, temporaray solution before we have login
 return (
    <div>
        <Heading1> Cash Flow </Heading1>
        
            {user.cashFlow ? 
            <div className="eachUser" key={user.firstName}>

                <Descriptiondiv> 
                Name: {user.firstName} {user.lastName} <br/>
                Email: {user.email} <br/>
                Address: {user.address} <br/>
                Phonenumber: {user.phoneNumber} <br/> <br/>
                </Descriptiondiv>

                <Tablediv> 
                    <table> 
                        <thead>
                            <tr>
                                <th id="name" onClick={event => sortArrayBy(event)}> item name  </th>
                                <th id="type" onClick={event => sortArrayBy(event)}> type </th>
                                <th id="amount" onClick={event => sortArrayBy(event)}> amount </th>
                                <th> changeMonthToMonth </th>
                                <th id="startDate" onClick={event => sortArrayBy(event)}> startDate </th>
                                <th id="endDate" onClick={event => sortArrayBy(event)}> endDate </th>
                                <th> edit </th>
                                <th> delete </th>
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
                                        <Button id={index} onClick={editItem} > 
                                            Edit 
                                        </Button>
                                    </a>
 
                                </td> 
                                <td>
                                    <Button onClick={(event)=> deletecashflow(event, user._id)} value={singleCashFlow.name}>
                                        Delete
                                    </Button> 
                                </td>             
                            </tr>
                            )} 

                        </tbody>    
                        <tfoot>
                            <tr>
                                <TableBottomData> Sum </TableBottomData>
                                <TableBottomData>  </TableBottomData>
                                <TableBottomData value = {user.cashFlow.reduce((a , b)=> {return a + b.amount}, 0)}>  {user.cashFlow.reduce((a , b)=> {return a + b.amount}, 0)} </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                            </tr>
                        </tfoot>             
                    </table>    
                </Tablediv>
                <br/> 
                <FormDiv id="form">
                    <label> Add new item/Edit existing item  </label>
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
                        <Button display="block" type="submit"> Submit </Button>
                        
                    </form>
                </FormDiv>

                <br/>
                <Descriptiondiv>
                        Cash flow at future time:  <input type="text"/> 
                </Descriptiondiv>
                <br/>         
            </div> : ""}
    
    </div>
 )
}

export default Budget;