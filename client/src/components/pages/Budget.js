import React, {useState, useEffect} from 'react';
import axios from "axios"
import {SubmitButton, Tablediv, Descriptiondiv, Heading1, FormDiv, TableBottomData, Numbertd} from "./assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import {  FaSortUp, FaSortDown } from "react-icons/fa"
import Modal from "./Modal"

 
function Budget() {

    const [users, setUsers] = useState([])   
    const [user, setUser] = useState({})
    const [userCashFlow, setUserCashFlow] = useState([])
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [amount, setAmount] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [addStatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)


    
    const [nameOpacity, setNameOpacity] = useState(0.5)
    const [typeOpacity, setTypeOpacity] = useState(0.5)
    const [amountOpacity, setAmountOpacity] = useState(0.5)
    const [startDateOpacity, setStartDateOpacity] = useState(0.5)
    const [endDateOpacity, setEndDateOpacity] = useState(0.5)
    
    const [sortIndicator, setSortIndicator] = useState("")
    const [sortDirectionName, setSortDirectionName] = useState(1)
    const [sortDirectionType, setSortDirectionType] = useState(1)
    const [sortDirectionAmount, setSortDirectionAmount] = useState(1)
    const [sortDirectionStartDate, setSortDirectionStartDate] = useState(1)
    const [sortDirectionEndDate, setSortDirectionEndDate] = useState(1)

    const [viewScenario, setViewScenario] = useState("initial")
    const [viewDate, setViewDate] = useState("")
    const [displayModal, setDisplayModal] = useState(false)


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

    useEffect(() => {
       if (user.cashFlow){
            let rawCashFlow = [...user.cashFlow]
            if (viewScenario === "all record") {
                setUserCashFlow(rawCashFlow)}
            else if (viewScenario === "specific date") {
                let futureCashFlow = rawCashFlow.filter(singleCashFlow => {return ((singleCashFlow.startDate.localeCompare(viewDate) === -1) && (singleCashFlow.endDate.localeCompare(viewDate) === 1))}); 
                console.log("future", futureCashFlow)
                setUserCashFlow(futureCashFlow)}
            else if (viewScenario === "initial") {
                let todayDate = new Date(); 
                let todayDateFormatted = todayDate.toISOString().split('T')[0]; 
                let todayCashFlow = rawCashFlow.filter(singleCashFlow => {return ((singleCashFlow.startDate.localeCompare(todayDateFormatted) === -1) && (singleCashFlow.endDate.localeCompare(todayDateFormatted) === 1))}); 
                console.log("today", todayCashFlow);
                setViewScenario("specific date")
                setViewDate(todayDateFormatted) 
                setUserCashFlow(todayCashFlow) }} else {}
    }, [user, viewScenario, viewDate])

    useEffect(()=>{
        if (sortIndicator === "name") {setNameOpacity(1.0); setTypeOpacity(0.5); setAmountOpacity(0.5); setStartDateOpacity(0.5); setEndDateOpacity(0.5) }
        else if (sortIndicator === "type") {setNameOpacity(0.5); setTypeOpacity(1.0); setAmountOpacity(0.5); setStartDateOpacity(0.5); setEndDateOpacity(0.5)}
        else if (sortIndicator === "amount") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(1.0); setStartDateOpacity(0.5); setEndDateOpacity(0.5)}
        else if (sortIndicator === "startDate") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(0.5); setStartDateOpacity(1.0); setEndDateOpacity(0.5)}
        else if (sortIndicator === "endDate") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(0.5); setStartDateOpacity(0.5); setEndDateOpacity(1.0)}
    },
    [sortIndicator]
    )

    function handleViewChange(event) {
        let mode = event.target.value
        setViewScenario(mode)
        console.log("myfilter", mode)
    }

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
        setSortIndicator(event.target.id)
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
            
                
                {user.email ? 
                <div className="eachUser" key={user.firstName}>
                    <Descriptiondiv> 
                    Name: {user.firstName} {user.lastName} <br/>
                    Email: {user.email} <br/>
                    Address: {user.address} <br/>
                    Phonenumber: {user.phoneNumber} <br/> <br/>
                    </Descriptiondiv>
                    {userCashFlow? 
                    <div className="Dynamic ">                                             
                            <FormDiv> 
                                Show cash flow :  
                                <select value={viewScenario} required onChange={(event)=>{handleViewChange(event)}}>
                                    
                                    <option value="all record"> of all record </option>
                                    <option value="specific date"> on Specific date </option>
                                </select>   
                            </FormDiv>
                            

                            <Descriptiondiv viewScenario={viewScenario}>
                                    of <input type="date" value={viewDate} onChange={(event)=>{setViewDate(event.target.value)}} /> <br/> 
                            </Descriptiondiv>
                            <br/>   
                            <Tablediv> 
                                <table> 
                                    <thead>
                                        <tr>
                                            <th id="name" opacity={nameOpacity} onClick={event => sortArrayBy(event)}> item name 
                                                {sortDirectionName > 0 ? <FaSortUp style={{"pointer-events": 'none', "opacity": nameOpacity}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none', "opacity": nameOpacity}}> </FaSortDown> }
                                            </th>
                                            <th id="type" onClick={event => sortArrayBy(event)}> type 
                                                {sortDirectionType > 0 ? <FaSortUp style={{"pointer-events": 'none', "opacity": typeOpacity}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none', "opacity": typeOpacity}}> </FaSortDown> }
                                            </th>
                                            <th id="amount" onClick={event => sortArrayBy(event)}> amount 
                                                {sortDirectionAmount > 0 ? <FaSortUp style={{"pointer-events": 'none', "opacity": amountOpacity}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none', "opacity": amountOpacity}}> </FaSortDown> }
                                            </th>
                                            <th> changeMonthToMonth </th>
                                            <th id="startDate" onClick={event => sortArrayBy(event)}> startDate 
                                                {sortDirectionStartDate > 0 ? <FaSortUp style={{"pointer-events": 'none', "opacity": startDateOpacity}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none', "opacity": startDateOpacity}}> </FaSortDown> }
                                            </th>
                                            <th id="endDate" onClick={event => sortArrayBy(event)}> endDate 
                                                {sortDirectionEndDate > 0 ? <FaSortUp style={{"pointer-events": 'none', "opacity": endDateOpacity}}> </FaSortUp> : <FaSortDown style={{"pointer-events": 'none', "opacity": endDateOpacity}}> </FaSortDown> }
                                            </th>
                                            <th> edit </th>
                                            <th> delete </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {userCashFlow.map(
                                        (singleCashFlow, index) => 
                                           <tr key={singleCashFlow.name + index}>
                                            <td> {singleCashFlow.name} </td>
                                            <td> {singleCashFlow.type} </td>
                                            <Numbertd value={singleCashFlow.amount}> {singleCashFlow.amount} </Numbertd>
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
                                                <button onClick={(event)=> {window.confirm("are you sure you want to delete this record?") && deletecashflow(event, user._id)}} value={singleCashFlow.name}>
                                                    <RiDeleteBin6Line style={{"pointer-events": 'none'}}></RiDeleteBin6Line>
                                                    <Modal displayModal={displayModal} setDisplayModal={setDisplayModal}> </Modal>
                                                </button> 
                                            </td>             
                                        </tr>
                                        )} 
                                    </tbody>    
                                    <tfoot viewScenario= {viewScenario}>
                                        <tr>
                                            <TableBottomData> Sum </TableBottomData>
                                            <TableBottomData>  </TableBottomData>
                                            <TableBottomData value = {userCashFlow.reduce((a , b)=> {return a + b.amount}, 0)}>  {userCashFlow.reduce((a , b)=> {return a + b.amount}, 0)} </TableBottomData>
                                            <TableBottomData>   </TableBottomData>
                                            <TableBottomData>   </TableBottomData>
                                            <TableBottomData>   </TableBottomData>
                                            <TableBottomData>   </TableBottomData>
                                            <TableBottomData>   </TableBottomData>
                                        </tr>
                                    </tfoot>             
                                </table>    
                            </Tablediv>
                    </div> : ""
                }
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
                </div> : ""}
        
        </div>
    
 )
}

export default Budget;