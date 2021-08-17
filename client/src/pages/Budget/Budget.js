import React, {useState, useEffect, useContext} from 'react';
import axios from "axios"
import {Numbertd} from "../../components/AssetBudget/assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import {  FaSortUp, FaSortDown } from "react-icons/fa"
import {Modal} from "../../components/AssetBudget/Budget/BudgetModal"
import AuthenticationContext from '../../components/auth/AuthenticationContext';

import './AssetBudgetTransaction.css'


function Budget() {

    const {id} = useContext(AuthenticationContext)
    const [user, setUser] = useState({})
    const [selectedMonth, setSelectedMonth] = useState('')
    const [budgetTableData, setBudgetTableData] = useState([])

    useEffect(() => {
        let todaysDate = new Date()
        let year = todaysDate.getFullYear()
        let month = todaysDate.getMonth() + 1
        if (month.toString.length === 1) {
            month = '0' + month
        }
        setSelectedMonth(year+'-'+month)
    },[])

    const [name, setName] = useState("")
    const [type, setType] = useState("expense")
    const [amount, setAmount] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const [addStatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)

    //  This is the control the sorting table   
    const [nameOpacity, setNameOpacity] = useState(0.5)
    const [typeOpacity, setTypeOpacity] = useState(0.5)
    const [amountOpacity, setAmountOpacity] = useState(0.5)
    const [startDateOpacity, setStartDateOpacity] = useState(0.5)
    const [endDateOpacity, setEndDateOpacity] = useState(0.5)

    //  This is the sort Indication    
    const [sortIndicator, setSortIndicator] = useState("")
    const [sortDirectionName, setSortDirectionName] = useState(1)
    const [sortDirectionType, setSortDirectionType] = useState(1)
    const [sortDirectionAmount, setSortDirectionAmount] = useState(1)
    const [sortDirectionStartDate, setSortDirectionStartDate] = useState(1)
    const [sortDirectionEndDate, setSortDirectionEndDate] = useState(1)

    const [nameToDelete, setNameToDelete] = useState("")
    const [displayModal, setDisplayModal] = useState(false)

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get(`/api/user/${id}`, )
            setUser(data) 
        }
        getUsers()
        setAddStatus(0)
        setDeleteStatus(0)
    }, [addStatus, deleteStatus, id])

    useEffect(()=>{
        if (sortIndicator === "name") {setNameOpacity(1.0); setTypeOpacity(0.5); setAmountOpacity(0.5); setStartDateOpacity(0.5); setEndDateOpacity(0.5) }
        else if (sortIndicator === "type") {setNameOpacity(0.5); setTypeOpacity(1.0); setAmountOpacity(0.5); setStartDateOpacity(0.5); setEndDateOpacity(0.5)}
        else if (sortIndicator === "amount") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(1.0); setStartDateOpacity(0.5); setEndDateOpacity(0.5)}
        else if (sortIndicator === "startDate") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(0.5); setStartDateOpacity(1.0); setEndDateOpacity(0.5)}
        else if (sortIndicator === "endDate") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(0.5); setStartDateOpacity(0.5); setEndDateOpacity(1.0)}
        else {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(0.5); setStartDateOpacity(0.5); setEndDateOpacity(0.5)} 
    },
    [sortIndicator]
    )

    useEffect(() => {
        let categoryArray = []
        for (let i in user.transaction) {
            let splitCategories = user.transaction[i].category.split(', ')
            if (splitCategories[2]) {
                categoryArray.push(splitCategories[2])
            } else if (splitCategories[1]) {
                categoryArray.push(splitCategories[1])
            } else {
                categoryArray.push(splitCategories[0])
            }

        }
        categoryArray = [...new Set(categoryArray)]
        let transactionObject = {}
        for (let i in categoryArray) {
            transactionObject[categoryArray[i]] = 0
        }
        for (let i in user.transaction) {
            let splitCategories = user.transaction[i].category.split(', ')
            for (let j in splitCategories) {
                for (let k in categoryArray) {
                    if (categoryArray[k] === splitCategories[j]) {
                        transactionObject[categoryArray[k]] = transactionObject[categoryArray[k]] + user.transaction[i].amount
                    }
                }
            }
        }
        
        let tableDisplayArray = []
        for (let i in transactionObject) {
            tableDisplayArray.push({
                amount: Math.round(transactionObject[i]),
                name: i,
                type: 'expense'
            })
        }
        for (let i in user.cashFlow) {
            tableDisplayArray.push(user.cashFlow[i])
        }
        setBudgetTableData(tableDisplayArray)
    }, [user])


    async function addNewCashFlow(event, id) {
        event.preventDefault()
        let newCashFlow = {name: name.toLowerCase(), type, amount: Number(amount), changeMonthToMonth : Number(changeMonthToMonth), startDate, endDate}
        let {data} = await axios.put(`/api/user/${id}/addcashflow/`, newCashFlow, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setName("")
            setType("expense")
            setAmount(0)
            setChangeMonthToMonth(0)
            setStartDate("")
            setEndDate("")
            setAddStatus(data.ok)
            setSortIndicator("")
        }
    }

    function editItem(event) {
        let index = event.target.id
        // Right now I am using users[0], eventually it will be just one user, so need to fix this later
        let dataToEdit = user.cashFlow[index]
        setName(dataToEdit.name)
        setType(dataToEdit.type)
        setAmount(dataToEdit.amount)
        setChangeMonthToMonth(dataToEdit.changeMonthToMonth)
        setStartDate(dataToEdit.startDate)
        setEndDate(dataToEdit.endDate)
    }

    function sortArrayBy(event) {
        setSortIndicator(event.target.id)
        let userCopy = {...user}
        userCopy.cashFlow.sort(
            (a,b)=>{
                if (event.target.id === "amount") {setSortDirectionAmount(sortDirectionAmount * -1); return (a[event.target.id]-b[event.target.id]) * sortDirectionAmount} 
                else if (event.target.id === "name") { setSortDirectionName(sortDirectionName * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionName}
                else if (event.target.id === "type") { setSortDirectionType(sortDirectionType * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionType}
                else if (event.target.id === "startDate") { setSortDirectionStartDate(sortDirectionStartDate * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionStartDate}
                else if (event.target.id === "endDate") { setSortDirectionEndDate(sortDirectionEndDate * -1); return a[event.target.id].localeCompare(b[event.target.id]) * sortDirectionEndDate}
                else return null
            }
        )
        setUser(userCopy)
    }

    // at line 46, right now I am only showing one, eventually will be changed, temporaray solution before we have login
    return (
        <div className='budget-container'>
            <h1 className='page-heading'>Budget</h1>
            <Modal 
                displayModal={displayModal} 
                setDisplayModal={setDisplayModal} 
                itemname={nameToDelete} 
                userid={user._id} 
                setDeleteStatus={setDeleteStatus} 
                setSortIndicator={setSortIndicator}
            ></Modal>
            {user ? 
                <div className='budget-container' key={user.firstName}>
                {budgetTableData ? 
                    <div className='budget-container' >                                             
                        <label className='form-div'> 
                            Show cash flow&emsp;&emsp;&emsp;
                            {selectedMonth ? 
                                <input 
                                    type="month" 
                                    name="budgetMonth"
                                    min="2018-03" 
                                    value={selectedMonth}
                                    onChange={(event) => {
                                        setSelectedMonth(event.target.value)
                                    }}
                                ></input>
                            : null}
                        </label> 
                        <div className='budget-table'>
                            <table> 
                                <thead>
                                    <tr className='table-title-row'>
                                        <th id="name" opacity={nameOpacity} onClick={event => sortArrayBy(event)}>
                                            Item Name
                                            {sortDirectionName > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortDown> }
                                        </th>
                                        <th id="type" onClick={event => sortArrayBy(event)} style={{width : "20%"}}>
                                            Type
                                            {sortDirectionType > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortDown> }
                                        </th>
                                        <th id="amount" onClick={event => sortArrayBy(event)}>
                                            Amount
                                            {sortDirectionAmount > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": amountOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": amountOpacity}}> </FaSortDown> }
                                        </th>
                                        <th>Month to Month Change</th>
                                        <th id="startDate" onClick={event => sortArrayBy(event)}>
                                            Start Date
                                            {sortDirectionStartDate > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": startDateOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": startDateOpacity}}> </FaSortDown> }
                                        </th>
                                        <th id="endDate" onClick={event => sortArrayBy(event)}>
                                            End Date
                                            {sortDirectionEndDate > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": endDateOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": endDateOpacity}}> </FaSortDown> }
                                        </th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgetTableData.map(
                                        (singleCashFlow, index) => 
                                            <tr key={singleCashFlow.name + index}>
                                            <td> {singleCashFlow.name.charAt(0).toUpperCase() + singleCashFlow.name.slice(1)} </td>
                                            <td> {singleCashFlow.type} </td>
                                            <Numbertd value={singleCashFlow.amount}> {singleCashFlow.amount} </Numbertd>
                                            <td> {singleCashFlow.changeMonthToMonth} </td>
                                            <td> {singleCashFlow.startDate} </td>
                                            <td> {singleCashFlow.endDate} </td>     
                                            <td> 
                                                <a href="#form">
                                                    <button id={index} onClick={editItem}> 
                                                        <RiEditLine style={{"pointerEvents": 'none'}}></RiEditLine>
                                                    </button>
                                                </a>                                      
                                            </td> 
                                            <td>
                                                <button onClick={()=>{setNameToDelete(singleCashFlow.name); setDisplayModal(prev => !prev)}}>
                                                    <RiDeleteBin6Line style={{"pointerEvents": 'none'}}></RiDeleteBin6Line>
                                                </button> 
                                            </td>             
                                        </tr>
                                    )} 
                                </tbody>
                                {user.cashFlow ?
                                    <tfoot className='table-title-row'>
                                        <tr>
                                            <td>Sum</td>
                                            <td></td>
                                            <td value = {user.cashFlow.reduce((a , b)=> {return a + b.amount}, 0)}>
                                                {user.cashFlow.reduce((a , b)=> {return a + b.amount}, 0)}
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                : null}         
                            </table>    
                        </div>
                    </div> 
                : null}
                <form className='entry-info-form' onSubmit={(event) => addNewCashFlow(event, user._id)}>
                    <h3 className= 'entry-info-form-header'>Add New Item / Edit Existing Item</h3>
                    <label className='entry-info-form-row'>
                        Item Name:&nbsp;
                        <input className ='budget-input' type="text" required value={name} onChange={(event)=>{setName(event.target.value)}}/>
                    </label>
                    <label className='entry-info-form-row'>
                        Type:&nbsp;
                        <select value={type} required onChange={(event)=>{setType(event.target.value)}}>
                            <option value="expense"> expense </option>
                            <option value="income"> income </option>
                        </select>
                    </label>
                    <label className='entry-info-form-row'>
                        Amount:&nbsp;
                        <input className ='budget-input' type="text" required value={amount} onChange={(event)=>{setAmount(event.target.value)}}/>
                    </label>
                    <label className='entry-info-form-row'>
                        Month to Month Change:&nbsp;
                        <input className ='budget-input' type="text" required value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}}/>
                    </label>
                    <label className='entry-info-form-row'>
                        Start Date (DD-MM-YYYY):&nbsp;
                        <input className ='budget-input' type="date" required value={startDate} onChange={(event)=>{setStartDate(event.target.value)}}/>
                    </label>
                    <label className='entry-info-form-row'> 
                        End Date (DD-MM-YYYY):&nbsp;
                        <input className ='budget-input' type="date" required value={endDate} onChange={(event)=>{setEndDate(event.target.value)}}/>
                    </label>
                    <button className='entry-info-form-button' type="submit">Submit</button>                                                       
                </form>
            </div> : ""}
        </div>
        
    )
}

export default Budget;