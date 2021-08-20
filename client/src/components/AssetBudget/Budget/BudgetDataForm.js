import React, {useEffect, useState} from 'react'

export default function BudgetDataForm({parentParams, sendDataToParent}) {

    console.log(parentParams)

    const [formInput, setFormInput] = useState({
        name:'',
        type:'expense',
        amount: 0,
        changeMonthToMonth: 0,
        startDate: '',
        endDate: ''
    })

    useEffect(() => {
        setFormInput({...formInput, 
            name: parentParams.name,
            amount: parentParams.amount,
            type: parentParams.type,
        })
    },[parentParams])

  
    return (
        <form className='entry-info-form'>
            <h3 className= 'entry-info-form-header'>
                {typeof parentParams === 'object' ?
                    'Edit Item'
                : null}
                </h3>
            <label className='entry-info-form-row'>
                Item Name:&nbsp;
                <input className ='budget-input' type="text" required value={formInput.name} onChange={(event)=>{setFormInput({...formInput, name: event.target.value})}}/>
            </label>
            <label className='entry-info-form-row'>
                Type:&nbsp;
                <select className='budget-input' value={formInput.type} required onChange={(event)=>{setFormInput({...formInput, type: event.target.value})}}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="recurring-payment">Recurring Payment</option>
                </select>
            </label>
            <label className='entry-info-form-row'>
                Amount:&nbsp;
                <input className ='budget-input' type="text" required value={formInput.amount} onChange={(event)=>{setFormInput({...formInput, amount: event.target.value})}}/>
            </label>
            <label className='entry-info-form-row'>
                Month to Month Change:&nbsp;
                <input className ='budget-input' type="text" required value={formInput.changeMonthToMonth} onChange={(event)=>{setFormInput({...formInput, changeMonthToMonth: event.target.value})}}/>
            </label>
            <label className='entry-info-form-row'>
                Start Date (DD-MM-YYYY):&nbsp;
                <input className ='budget-input' type="date" required value={formInput.startDate} onChange={(event)=>{setFormInput({...formInput, startDate: event.target.value})}}/>
            </label>
            <label className='entry-info-form-row'> 
                End Date (DD-MM-YYYY):&nbsp;
                <input className ='budget-input' type="date" required value={formInput.endDate} onChange={(event)=>{setFormInput({...formInput, endDate: event.target.value})}}/>
            </label>
            <button 
                className='entry-info-form-button' 
                onClick={(event) => {
                    event.preventDefault()
                    sendDataToParent(formInput)
                }}
            >
                Submit
            </button>                                                       
        </form>
  )
}
