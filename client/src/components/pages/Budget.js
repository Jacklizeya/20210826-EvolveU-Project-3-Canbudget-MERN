import React, {useState, useEffect} from 'react';
import axios from "axios"
import {SubmitButton, Tablediv, Descriptiondiv, Heading1, FormDiv, TableBottomData} from "./assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import {  FaSortUp, FaSort, FaSortDown } from "react-icons/fa"

 
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

    const [sortDirectionName, setSortDirectionName] = useState(1)
    const [sortDirectionType, setSortDirectionType] = useState(1)
    const [sortDirectionAmount, setSortDirectionAmount] = useState(1)
    const [sortDirectionStartDate, setSortDirectionStartDate] = useState(1)
    const [sortDirectionEndDate, setSortDirectionEndDate] = useState(1)



    const [futureDate, setFutureDate] = useState("")


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
                    if (event.target.id === "amount") {setSortDirectionAmount(sortDirectionAmount * -1); return (a[event.target.id]-b[event.target.id]) * sortDirectionAmount} 
                    else if (event.target.id === "name") { setSortDirectionName(sortDirectionName * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionName}
                    else if (event.target.id === "type") { setSortDirectionType(sortDirectionType * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionType}
                    else if (event.target.id === "startDate") { setSortDirectionStartDate(sortDirectionStartDate * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionStartDate}
                    else if (event.target.id === "endDate") { setSortDirectionEndDate(sortDirectionEndDate * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionEndDate}
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
                                <th id="name" onClick={event => sortArrayBy(event)}> item name 
                                    {sortDirectionName > 0 ? <FaSortUp style={{"pointer-events": 'none'}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none'}}> </FaSortDown> }
                                </th>
                                <th id="type" onClick={event => sortArrayBy(event)}> type 
                                    {sortDirectionType > 0 ? <FaSortUp style={{"pointer-events": 'none'}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none'}}> </FaSortDown> }
                                </th>
                                <th id="amount" onClick={event => sortArrayBy(event)}> amount 
                                    {sortDirectionAmount > 0 ? <FaSortUp style={{"pointer-events": 'none'}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none'}}> </FaSortDown> }
                                </th>
                                <th> changeMonthToMonth </th>
                                <th id="startDate" onClick={event => sortArrayBy(event)}> startDate 
                                    {sortDirectionStartDate > 0 ? <FaSortUp style={{"pointer-events": 'none'}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none'}}> </FaSortDown> }
                                </th>
                                <th id="endDate" onClick={event => sortArrayBy(event)}> endDate 
                                    {sortDirectionEndDate > 0 ? <FaSortUp style={{"pointer-events": 'none'}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none'}}> </FaSortDown> }
                                </th>
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
                                        <button id={index} onClick={editItem}> 
                                            <RiEditLine style={{"pointer-events": 'none'}}></RiEditLine>
                                        </button>
                                    </a>
 
                                </td> 
                                <td>
                                    <button onClick={(event)=> deletecashflow(event, user._id)} value={singleCashFlow.name}>
                                        <RiDeleteBin6Line style={{"pointer-events": 'none'}}></RiDeleteBin6Line>
                                    </button> 
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
                        <select value={type} required onChange={(event)=>{setType(event.target.value)}}>
                            <option value="expense"> expense </option>
                            <option value="income"> income </option>
                        </select>   <br/>

                        <label> amount </label>
                        <input type="text" required value={amount} onChange={(event)=>{setAmount(event.target.value)}}/> <br/>
                        <label> changeMonthToMonth </label>
                        <input type="text" required value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                        <label> startDate DD-MM-YYYY </label>
                        <input type="date" required value={startDate} onChange={(event)=>{setStartDate(event.target.value)}} /> <br/>
                        <label> endDate DD-MM-YYYY </label>
                        <input type="date" required value={endDate} onChange={(event)=>{setEndDate(event.target.value)}} /> <br/>
                        <SubmitButton display="block" type="submit"> Submit </SubmitButton>
                        
                    </form>
                </FormDiv>

                <br/>
                <Descriptiondiv>
                        Cash flow at future time:  
                        <input type="date" value={futureDate} onChange={(event)=>{setFutureDate(event.target.value)}} /> <br/> 
                        Your monthly cash flow is   {futureDate ? (user.cashFlow.filter(singleCashFlow => {return ((singleCashFlow.startDate.localeCompare(futureDate) === -1) && (singleCashFlow.endDate.localeCompare(futureDate) === 1))}).reduce((a , b)=> {return a + b.amount}, 0)) : "Please choose a date"}
                </Descriptiondiv>
                <br/>         
            </div> : ""}
    
    </div>
 )
}

export default Budget;