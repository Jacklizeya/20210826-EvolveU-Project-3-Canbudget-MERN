import React, {useState, useEffect} from 'react';
import axios from "axios"
import {SubmitButton, Tablediv, Descriptiondiv, Heading1, FormDiv, TableBottomData, tdContainButton} from "./assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';

function Asset() {
    const [users, setUsers] = useState([])  
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [value, setValue] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [addstatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)
    const [sortDirection, setSortDirection] = useState(1)

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get("/api/user", )
            console.log(data)
            setUsers(data)
            setUser(data[0])
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

    function sortArrayBy(event) {
        console.log("I want to sort by", event.target.id)
        let userCopy = {...user}
        userCopy.balanceSheet.sort(
            (a,b)=>{
                    if (event.target.id === "value") {setSortDirection(sortDirection * -1); console.log(sortDirection); return (a[event.target.id]-b[event.target.id]) * sortDirection} 
                    else { setSortDirection(sortDirection * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirection}
            }
            )
        console.log(userCopy)
        setUser(userCopy)
        console.log(user)
    }

// right now only hook up one, wait until login is done 
 return (
    <>
        <Heading1> Balance Sheet </Heading1>
        {

            user.balanceSheet  ? 
            <div key={user.firstName + "Asset"}>
            <Descriptiondiv> 
            Name: {user.firstName} {user.lastName} <br/>
            Email: {user.email} <br/>
            Address: {user.address} <br/>
            Phonenumber: {user.phoneNumber} <br/> <br/>
            </Descriptiondiv>


                <Tablediv>
                    <table> 
                        <thead>
                            <tr key="itemname">
                                <th id="name" onClick={event => sortArrayBy(event)}> item name </th>
                                <th id="type" onClick={event => sortArrayBy(event)}> type </th>
                                <th id="value" onClick={event => sortArrayBy(event)}> value </th>
                                <th> changeMonthToMonth </th>
                                <th> edit </th>
                                <th> delete </th>
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
                                            <RiEditLine style={{"pointerEvents": 'none'}}></RiEditLine>
                                        </button>
                                    </a>
                                </td> 
                                <td>
                                    <button onClick={(event)=> deleteBalanceSheet(event, user._id)} value={singleBalanceSheet.name}>
                                        <RiDeleteBin6Line style={{"pointerEvents": 'none'}}></RiDeleteBin6Line>
                                    </button> 
                                </td>     
                            </tr>
                            )} 
                        </tbody>

                        <tfoot>
                            <tr key="itemname">
                                <TableBottomData> Sum </TableBottomData>
                                <TableBottomData value = {user.balanceSheet.reduce((a , b)=> {return a + b.value}, 0)}>  {user.balanceSheet.reduce((a , b)=> {return a + b.value}, 0)} </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                                <TableBottomData>   </TableBottomData>
                            </tr>
                        </tfoot>                 
                    </table> 
                </Tablediv>   
                
                <br/> 

                <FormDiv>
                    <div className="form" id="form">
                        <label> Add new item/Edit existing item  </label>
                        <form onSubmit={(event) => addNewBalanceSheet(event, user._id)}>
                            <label> Name of the item </label>
                            <input type="text" required value={name} onChange={(event)=>{setName(event.target.value)} }/> <br/>

                            <label> Type </label>
                            <input type="text" required value={type} onChange={(event)=>{setType(event.target.value)}}/> <br/>
                            
                            <label> value </label>
                            <input type="text" required value={value} onChange={(event)=>{(setValue(event.target.value))}}/> <br/>
                            <label> changeMonthToMonth </label>
                            <input type="text" required value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                            
                            <SubmitButton type="submit"> Submit </SubmitButton>
                            
                        </form>
                </div>         
                </FormDiv>
                
            </div> : ""
       }
        
        </>
 )
}

export default Asset;