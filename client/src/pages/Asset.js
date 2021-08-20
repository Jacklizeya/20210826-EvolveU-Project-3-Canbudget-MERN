import React, {useState, useEffect, useContext} from 'react';
// import { useHistory } from "react-router-dom";
import axios from "axios"
import {Numbertd} from "../components/AssetBudget/assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import {  FaSortUp, FaSortDown } from "react-icons/fa"
import AuthenticationContext from '../components/auth/AuthenticationContext';
import Plaid from '../components/AssetBudget/AssetPlaid';
import BudgetDataForm from '../components/AssetBudget/Budget/BudgetDataForm';

import './Budget/AssetBudgetTransaction.css'

function Asset() {
    const {id} = useContext(AuthenticationContext)
    // console.log(id)

    // const [users, setUsers] = useState([])  
    const [user, setUser] = useState({})
    const [userBalanceSheet, setUserBalanceSheet] = useState([])
    const [formParams, setFormParams] = useState(null)

    const [addstatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)

    //  This is the control the sorting table   
    const [nameOpacity, setNameOpacity] = useState(0.5)
    const [typeOpacity, setTypeOpacity] = useState(0.5)
    const [valueOpacity, setValueOpacity] = useState(0.5)
    //  This is the sort Indication    
    const [sortIndicator, setSortIndicator] = useState("")
    const [sortDirectionName, setSortDirectionName] = useState(1)
    const [sortDirectionType, setSortDirectionType] = useState(1)
    const [sortDirectionValue, setSortDirectionValue] = useState(1)
 // This is for Modal
    const [nameToDelete, setNameToDelete] = useState("")
    const [displayModal, setDisplayModal] = useState(false)

    // let history = useHistory()

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get(`/api/user/${id}`, )
            // console.log("*****", data)
            setUser(data)
        }
        getUsers()
        setAddStatus(0)
        setDeleteStatus(0)
    }, [addstatus, deleteStatus, id])

    useEffect(() => {
        if (user.balanceSheet){ 
            // console.log("**balance sheet", user.balanceSheet)
            setUserBalanceSheet(user.balanceSheet) } else {}
     }, [user])

    useEffect(()=>{
        if (sortIndicator === "name") {      setNameOpacity(1.0); setTypeOpacity(0.5); setValueOpacity(0.5); }
        else if (sortIndicator === "type") { setNameOpacity(0.5); setTypeOpacity(1.0); setValueOpacity(0.5); }
        else if (sortIndicator === "value") {setNameOpacity(0.5); setTypeOpacity(0.5); setValueOpacity(1.0); }
        else {setNameOpacity(0.5); setTypeOpacity(0.5); setValueOpacity(0.5);} 
    },
    [sortIndicator]
    ) 

    function sortArrayBy(event) {
        console.log("I want to sort by", event.target.id)
        setSortIndicator(event.target.id)
        let userCopy = {...user}
        userCopy.balanceSheet.sort(
            (a,b)=>{
                if (event.target.id === "name") { setSortDirectionName(sortDirectionName * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionName}
                else if (event.target.id === "type") { setSortDirectionType(sortDirectionType * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionType}
                else if (event.target.id === "value") {setSortDirectionValue(sortDirectionValue * -1); return (a[event.target.id]-b[event.target.id]) * sortDirectionValue} 
                else return null
                }
            )
        setUser(userCopy)
    }

// right now only hook up one, wait until login is done 
    return (
        <div className='budget-container'>
        <h1 className='page-heading'>Balance Sheet</h1>
        {user.email  ? 
            <div className='budget-container' key={user.firstName + "Asset"}>
                {userBalanceSheet? 
                    <div className='budget-table'>
                        <table> 
                            <thead>
                                <tr className='table-title-row'>
                                    <th id="name" onClick={event => sortArrayBy(event)}> 
                                        Item Name 
                                        {sortDirectionName > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortDown> }
                                    </th>
                                    <th id="type" onClick={event => sortArrayBy(event)} style={{width : "20%"}}> 
                                        Type 
                                        {sortDirectionType > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortDown> }
                                    </th>
                                    <th id="value" onClick={event => sortArrayBy(event)}> 
                                        Value 
                                        {sortDirectionValue > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": valueOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": valueOpacity}}> </FaSortDown> }
                                    </th>
                                    <th>Month to Month Change</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userBalanceSheet.map(
                                    (singleBalanceSheet, index) => 
                                    <tr key={singleBalanceSheet.name}>
                                        <td> {singleBalanceSheet.name.charAt(0).toUpperCase() + singleBalanceSheet.name.slice(1)} </td>
                                        <td> {singleBalanceSheet.type} </td>
                                        <Numbertd value={singleBalanceSheet.value}> {singleBalanceSheet.value} </Numbertd>
                                        <td> {singleBalanceSheet.changeMonthToMonth} </td>    
                                        <td> 
                                            <a href="#form">
                                                <button id={index} onClick={() => setFormParams(singleBalanceSheet)} > 
                                                    <RiEditLine style={{"pointerEvents": 'none'}}></RiEditLine>
                                                </button>
                                            </a>
                                        </td> 
                                        <td>
                                            <button onClick={() => deleteBalanceSheet(singleBalanceSheet.name, id)}>
                                                <RiDeleteBin6Line style={{"pointerEvents": 'none'}}></RiDeleteBin6Line>
                                            </button> 
                                        </td>     
                                    </tr>
                                )} 
                            </tbody>
                            <tfoot className='table-title-row'>
                                <tr>
                                    <td>Sum</td>
                                    <td></td>
                                    <td value = {Math.round(user.balanceSheet.reduce((a , b)=> {return a + b.value}, 0) * 100) / 100}>
                                        {Math.round(user.balanceSheet.reduce((a , b)=> {return a + b.value}, 0) * 100) / 100}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>                 
                        </table> 
                    </div>     
                : null}
                <button className='recurring-payment-button' onClick={() => setFormParams('add-asset')}>Add New Item</button>
                {formParams ?
                    <BudgetDataForm
                        parentParams={formParams}
                        sendDataToParent={(data) => {addNewBalanceSheet(data, id)}}
                    />
                : null}
                <Plaid id={id} setAddStatus={setAddStatus}> </Plaid>
            </div> : ""
        }
        </div>
    )

    async function addNewBalanceSheet(event, id) {
        let newBalanceSheet = {name: event.name.toLowerCase(), type: event.type, value: Number(event.amount), changeMonthToMonth: Number(event.changeMonthToMonth)}
        console.log("newBalanceSheet", newBalanceSheet)
        let {data} = await axios.put(`/api/user/${id}/addBalanceSheet/`, newBalanceSheet, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setAddStatus(data.ok)
            setSortIndicator("")
            setFormParams(null)
        }
    }

    async function deleteBalanceSheet(itemName, id) {
        let nameOfItemToRemove = itemName
        console.log(nameOfItemToRemove)
        let {data} = await axios.put(`/api/user/${id}/deletebalancesheet/`, {nameOfItemToRemove}, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setDeleteStatus(data.ok)
            setSortIndicator("")
        }
    }
}

export default Asset;