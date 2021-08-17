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
    const [tableSum, setTableSum] = useState(0)

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
    const [limitOpacity, setLimitOpacity] = useState(0.5)

    //  This is the sort Indication
    const [sortParams, setSortParams] = useState({
        indicator: '',
        name: 1,
        type: 1,
        amount: 1,
    })

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
        if (sortParams.indicator === "name") {setNameOpacity(1.0); setTypeOpacity(0.5); setAmountOpacity(0.5) }
        else if (sortParams.indicator === "type") {setNameOpacity(0.5); setTypeOpacity(1.0); setAmountOpacity(0.5)}
        else if (sortParams.indicator === "amount") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(1.0)}
        else if (sortParams.indicator === "budget") {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(0.5)}
        else {setNameOpacity(0.5); setTypeOpacity(0.5); setAmountOpacity(0.5)} 
    },
    [sortParams.indicator]
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
        let displaySum = 0
        for (let i in user.transaction) {
            let splitCategories = user.transaction[i].category.split(', ')
            for (let j in splitCategories) {
                for (let k in categoryArray) {
                    if (categoryArray[k] === splitCategories[j] && user.transaction[i].date.slice(0,7) === selectedMonth) {
                        transactionObject[categoryArray[k]] = transactionObject[categoryArray[k]] + user.transaction[i].amount
                        displaySum = displaySum + Math.round(Number(user.transaction[i].amount))
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
            displaySum = displaySum + Math.round(Number(user.cashFlow[i].amount))
        }
        setBudgetTableData(tableDisplayArray)
        setTableSum(displaySum)
    }, [user, selectedMonth])


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
            setSortParams({...sortParams, indicator: ""})
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
        setSortParams({...sortParams, indicator: event.target.id})
        let userCopy = budgetTableData
        userCopy.sort(
            (a,b)=>{
                if (event.target.id === "amount") {setSortParams({...sortParams, amount: sortParams.amount * -1}); return (a[event.target.id]-b[event.target.id]) * sortParams.amount} 
                else if (event.target.id === "name") { setSortParams({...sortParams, name: sortParams.name * -1}); return a[event.target.id].localeCompare(b[event.target.id]) * sortParams.name}
                else if (event.target.id === "type") { setSortParams({...sortParams, type: sortParams.type * -1}); return a[event.target.id].localeCompare(b[event.target.id]) * sortParams.type}
                else if (event.target.id === "limit") { setSortParams({...sortParams, type: sortParams.limit * -1}); return a[event.target.id].localeCompare(b[event.target.id]) * sortParams.limit}
                else return null
            }
        )
        setBudgetTableData(userCopy)
    }

    // at line 46, right now I am only showing one, eventually will be changed, temporaray solution before we have login
    return (
        <div className='budget-container'>
            <h1 className='page-heading'>Budget</h1>
            {user ? 
                <div className='budget-container' key={user.firstName}>
                {budgetTableData ? 
                    <div className='budget-container' >                                             
                        <label className='form-div'> 
                            Show cash flow&emsp;&emsp;&emsp;
                            {selectedMonth ? 
                                <input
                                    className='budget-input'
                                    type="month" 
                                    name="budgetMonth"
                                    min="2019-08" 
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
                                            {sortParams.name > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": nameOpacity}}> </FaSortDown> }
                                        </th>
                                        <th id="type" onClick={event => sortArrayBy(event)} style={{width : "20%"}}>
                                            Type
                                            {sortParams.type > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": typeOpacity}}> </FaSortDown> }
                                        </th>
                                        <th id="amount" onClick={event => sortArrayBy(event)}>
                                            Amount
                                            {sortParams.amount > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": amountOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": amountOpacity}}> </FaSortDown> }
                                        </th>
                                        <th>
                                            Goal
                                            {sortParams.limit > 0 ? <FaSortUp style={{"pointerEvents": 'none', "opacity": limitOpacity}}> </FaSortUp> : <FaSortDown style={{"pointerEvents": 'none', "opacity": limitOpacity}}> </FaSortDown> }
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
                                            <td> {singleCashFlow.limit} </td>
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
                                            <td></td>
                                            <td>Sum</td>
                                            <td>{tableSum}</td>
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
            </div> : null}
        </div>
        
    )
}

export default Budget;