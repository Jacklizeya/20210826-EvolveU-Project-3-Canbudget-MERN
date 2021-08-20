import React, {useState, useEffect, useContext} from 'react';
import axios from "axios"
import {Numbertd} from "../../components/AssetBudget/assetAndBudget.elements"
import {RiEditLine as EditLineIcon, RiDeleteBin6Line as DeleteLineIcon} from 'react-icons/ri';
import {FaSortUp as SortUpIcon, FaSortDown as SortDownIcon} from "react-icons/fa"
import AuthenticationContext from '../../components/auth/AuthenticationContext';
import BudgetDataForm from '../../components/AssetBudget/Budget/BudgetDataForm';
import Line from '../../components/ApexCharts/Line';
import RadialBar from '../../components/ApexCharts/RadialBar'

import './AssetBudgetTransaction.css'
// import PlaidCategories from '../../components/AssetBudget/Budget/PlaidCategories';


function Budget() {

    const {id} = useContext(AuthenticationContext)
    const [user, setUser] = useState({})
    const [selectedMonth, setSelectedMonth] = useState('')
    const [budgetTableData, setBudgetTableData] = useState([])
    const [tableSum, setTableSum] = useState(0)
    const [budgetSum, setBudgetSum] = useState(0)
    const [expenseLineProps, setExpenseLineProps] = useState({})

    const [formParams, setFormParams] = useState(null)

    useEffect(() => {
        let todaysDate = new Date()
        let year = todaysDate.getFullYear()
        let month = todaysDate.getMonth() + 1
        if (month.toString.length === 1) {
            month = '0' + month
        }
        setSelectedMonth(year+'-'+month)
    },[])

    const [addStatus, setAddStatus] = useState(0)
    const [deleteStatus, setDeleteStatus] = useState(0)

    const [opacityParams, setOpacityParams] = useState({
        name: 0.1,
        type: 0.1,
        amount: 0.1,
        limity: 0.1
    })
    const [sortParams, setSortParams] = useState({
        indicator: '',
        name: 1,
        type: 1,
        amount: 1,
        limit: 1
    })

    const [nameToDelete, setNameToDelete] = useState("")

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
        if (sortParams.id === "name") {setOpacityParams(o => ({...o, name: 1.0})); setOpacityParams(o => ({...o, type: 0.5})); setOpacityParams(o => ({...o, amount: 0.5})); setOpacityParams(o => ({...o, limit: 0.5}))}
        else if (sortParams.id === "type") {setOpacityParams(o => ({...o, name: 0.5})); setOpacityParams(o => ({...o, type: 1.0})); setOpacityParams(o => ({...o, amount: 0.5})); setOpacityParams(o => ({...o, limit: 0.5}))}
        else if (sortParams.id === "amount") {setOpacityParams(o => ({...o, name: 0.5})); setOpacityParams(o => ({...o, type: 0.5})); setOpacityParams(o => ({...o, amount: 1.0})); setOpacityParams(o => ({...o, limit: 0.5}))}
        else if (sortParams.id === "budget") {setOpacityParams(o => ({...o, name: 0.5})); setOpacityParams(o => ({...o, type: 0.5})); setOpacityParams(o => ({...o, amount: 0.5})); setOpacityParams(o => ({...o, limit: 0.5}))}
        else if (sortParams.id === "limit") {setOpacityParams(o => ({...o, name: 0.5})); setOpacityParams(o => ({...o, type: 0.5})); setOpacityParams(o => ({...o, amount: 0.5})); setOpacityParams(o => ({...o, limit: 1.0}))}
        else {setOpacityParams(o => ({...o, name: 0.5})); setOpacityParams(o => ({...o, type: 0.5})); setOpacityParams(o => ({...o, amount: 0.5})); setOpacityParams(o => ({...o, limit: 0.5}))} 
    },
    [sortParams.indicator, sortParams.id]
    )

    useEffect(() => {
        let categoryArray = []
        let lineChartDataObject = {
            labels: [],
            series: [
                {
                    name: 'Cumulative Spending',
                    type: 'line',
                    data: []
                },
                {
                    name: 'Monthly Budget',
                    type: 'line',
                    data: []
                }
            ]
        }
        let monthBoundaries = {
            current: 1,
            end: 31,
            currentSum: 0
        }
        for (let i in user.cashFlow) {
            if (user.cashFlow[i].type === 'Recurring Payment') {
                monthBoundaries.currentSum = monthBoundaries.currentSum + Number(user.cashFlow[i].amount * -1)
            }
        }
        while (monthBoundaries.current < monthBoundaries.end) {
            lineChartDataObject.labels.push(new Date(selectedMonth.slice(0,4), selectedMonth.slice(5,7)-1, monthBoundaries.current).getTime())
            lineChartDataObject.series[1].data.push(budgetSum)
            for (let i in user.transaction) {
                if (user.transaction[i].date.slice(0,7) === selectedMonth) {
                    let transactionDate = Number(user.transaction[i].date.slice(8,10))
                    if (transactionDate === monthBoundaries.current && user.transaction[i].amount < 0) {
                        let mainCategory = user.transaction[i].category.split(', ')[0]
                        if (mainCategory !== 'Payment' && mainCategory !== 'Credit Card' && mainCategory !== 'Debit' && mainCategory !== 'Deposit'  && mainCategory !== 'Credit' && mainCategory !== 'Transfer') {
                            monthBoundaries.currentSum = monthBoundaries.currentSum + Number(user.transaction[i].amount * -1)
                        }
                    }
                }
            }
            lineChartDataObject.series[0].data.push(monthBoundaries.currentSum.toFixed(2))
            monthBoundaries.current = monthBoundaries.current + 1
        }
        setExpenseLineProps(lineChartDataObject)

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
            for (let k in categoryArray) {
                if (categoryArray[k] === splitCategories[splitCategories.length - 1] && user.transaction[i].date.slice(0,7) === selectedMonth) {
                    transactionObject[categoryArray[k]] = transactionObject[categoryArray[k]] + user.transaction[i].amount
                }
            }
        }

        
        let tableDisplayArray = []
        let displaySum = 0
        for (let i in transactionObject) {
            if (i !== 'Payment' && i !== 'Credit Card' && i !== 'Debit' && i !== 'Deposit'  && i !== 'Credit' && i !== 'Transfer') {
                tableDisplayArray.push({
                    amount: Math.round(transactionObject[i]),
                    name: i,
                    type: transactionObject[i] > 0 ? 'income' : 'expense'
                })
                displaySum = displaySum + Math.round(transactionObject[i])
            }
        }
        for (let i in user.cashFlow) {
            tableDisplayArray.push(user.cashFlow[i])
            if (user.cashFlow[i].category !== 'Payment' && user.cashFlow[i].category !== 'Credit Card' && user.cashFlow[i].category !== 'Debit' && user.cashFlow[i].category !== 'Deposit'  && user.cashFlow[i].category !== 'Credit') {
                displaySum = displaySum + Math.round(Number(user.cashFlow[i].amount))
            }
        }

        setBudgetTableData(tableDisplayArray)
        setTableSum(displaySum)
    }, [user, selectedMonth, budgetSum])

    useEffect(() => {
        let totalBudget = 0
        for (let i in user.plaidCategories) {
            totalBudget = totalBudget + Math.round(Number(user.plaidCategories[i].limit))
        }
        for (let i in user.cashFlow) {
            totalBudget = totalBudget - Math.round(Number(user.cashFlow[i].amount))
        }
        setBudgetSum(totalBudget)
    }, [user])


    // async function addNewCashFlow(event, id) {
    //     event.preventDefault()
    //     let newCashFlow = {name: name.toLowerCase(), type, amount: Number(amount), changeMonthToMonth : Number(changeMonthToMonth), startDate, endDate}
    //     let {data} = await axios.put(`/api/user/${id}/addcashflow/`, newCashFlow, {headers : {"Content-Type": "application/json"}})
    //     if (data.ok) {
    //         setName("")
    //         setType("expense")
    //         setAmount(0)
    //         setChangeMonthToMonth(0)
    //         setStartDate("")
    //         setEndDate("")
    //         setAddStatus(data.ok)
    //         setSortParams({...sortParams, indicator: ""})
    //     }
    // }

    function sortArrayBy(event) {
        setSortParams({...sortParams, indicator: event.target.id})
        let userCopy = budgetTableData
        userCopy.sort(
            (a,b)=>{
                if (event.target.id === "amount") {setSortParams({...sortParams, amount: sortParams.amount * -1}); return (a[event.target.id]-b[event.target.id]) * sortParams.amount} 
                else if (event.target.id === "name") { setSortParams({...sortParams, name: sortParams.name * -1}); return a[event.target.id].localeCompare(b[event.target.id]) * sortParams.name}
                else if (event.target.id === "type") { setSortParams({...sortParams, type: sortParams.type * -1}); return a[event.target.id].localeCompare(b[event.target.id]) * sortParams.type}
                else if (event.target.id === "limit") { setSortParams({...sortParams, limit: sortParams.limit * -1}); return a[event.target.id].localeCompare(b[event.target.id]) * sortParams.limit}
                else return null
            }
        )
        setBudgetTableData(userCopy)
    }

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
                                        <th id="name" opacity={opacityParams.name} onClick={event => sortArrayBy(event)}>
                                            Item Name
                                            {sortParams.name > 0 ? 
                                                <SortUpIcon 
                                                    style={{"pointerEvents": 'none', "opacity": opacityParams.name}}
                                                ></SortUpIcon> : 
                                                <SortDownIcon 
                                                    style={{"pointerEvents": 'none', "opacity": opacityParams.name}}>
                                                </SortDownIcon>
                                            }
                                        </th>
                                        <th id="type" opacity={opacityParams.type} onClick={event => sortArrayBy(event)} style={{width : "20%"}}>
                                            Type
                                            {sortParams.type > 0 ? 
                                                <SortUpIcon 
                                                    style={{"pointerEvents": 'none', "opacity": opacityParams.type}}>
                                                    </SortUpIcon> : 
                                                <SortDownIcon 
                                                    style={{"pointerEvents": 'none', "opacity": opacityParams.type}}>
                                                </SortDownIcon>
                                            }
                                        </th>
                                        <th id="amount" onClick={event => sortArrayBy(event)}>
                                            Amount
                                            {sortParams.amount > 0 ? <SortUpIcon style={{"pointerEvents": 'none', "opacity": opacityParams.amount}}> </SortUpIcon> : <SortDownIcon style={{"pointerEvents": 'none', "opacity": opacityParams.amount}}> </SortDownIcon> }
                                        </th>
                                        <th>
                                            Monthly Limit
                                        </th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgetTableData.map((singleCashFlow, index) =>
                                        <tr key={singleCashFlow.name + index}>
                                            <td>
                                                {singleCashFlow.name.charAt(0).toUpperCase() + singleCashFlow.name.slice(1)}
                                            </td>
                                            <td>
                                                {singleCashFlow.type}
                                            </td>
                                            <Numbertd value={Number(singleCashFlow.amount)}> 
                                                {Number(singleCashFlow.amount).toFixed(2)} 
                                            </Numbertd>
                                            <td> 
                                                {singleCashFlow.limit ?
                                                    Number(singleCashFlow.limit * -1).toFixed(2) :
                                                    user.plaidCategories.map((category) => category.name === singleCashFlow.name ? Number(category.limit).toFixed(2) : null)
                                                }
                                            </td>
                                            <td> 
                                                <a href="#form">
                                                    <button id={index} onClick={(event) => {setFormParams(singleCashFlow)}}> 
                                                        <EditLineIcon 
                                                            style={{"pointerEvents": 'none'}}>
                                                        </EditLineIcon>
                                                    </button>
                                                </a>                                      
                                            </td>
                                            <td>
                                                <button onClick={()=>{setNameToDelete(singleCashFlow.name)}}>
                                                    <DeleteLineIcon style={{"pointerEvents": 'none'}}></DeleteLineIcon>
                                                </button> 
                                            </td>             
                                        </tr>
                                    )} 
                                </tbody>
                                {user.cashFlow ?
                                    <tfoot className='table-title-row'>
                                        <tr>
                                            <td></td>
                                            <td><strong>Sum</strong></td>
                                            <td><strong>{tableSum}</strong></td>
                                            <td><strong>{budgetSum}</strong></td>
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
            {/* <h3 className='page-heading'>Monthly Spending</h3> */}
            {expenseLineProps && budgetSum && tableSum ?
                <div className='transaction-chart-container'>
                    <div className='budget-individual-chart'>
                        <Line parentData={expenseLineProps} />
                    </div>
                    <div className='budget-individual-chart'>
                        <RadialBar
                            budgetSum={budgetSum}
                            transactionSum={tableSum}
                        />
                    </div>
                </div>
            : null}
            {formParams ? 
                <BudgetDataForm
                    parentParams={formParams}
                    sendDataToParent={(data) => {console.log(data)}}
                />
            : null}
            {/* <PlaidCategories parentUser={user}/> */}
        </div>
        
    )
}

export default Budget;