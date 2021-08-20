import React, {useEffect, useState} from 'react'

export default function BudgetDataForm({parentParams, sendDataToParent}) {

    const [formInput, setFormInput] = useState({
        name:'',
        type:'expense',
        amount: 0,
        limit: 0,
        changeMonthToMonth: 0,
        startDate: '',
        endDate: ''
    })

    useEffect(() => {
        if (typeof parentParams === 'object') {
            if (parentParams.type === 'expense' || parentParams.type === 'income') {
                setFormInput(f =>({
                    ...f,
                    name: parentParams.name,
                    amount: parentParams.value,
                    type: parentParams.type
                }))
            } else {
                setFormInput({
                    ...formInput, 
                    name: parentParams.name,
                    amount: parentParams.amount,
                    type: parentParams.type,
                    limit: parentParams.limit
                })
            }
        } else if (parentParams === 'add-asset') {
            setFormInput(f => ({
                ...f,
                type: 'expense'
            }))
        }
    },[parentParams])

  
    return (
        <form className='entry-info-form'>
            <h3 className= 'entry-info-form-header'>
                {typeof parentParams === 'object' ?
                    'Edit Item' :
                    'Add Item'
                }
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
            {parentParams !== 'add-asset' && parentParams.type !== 'income' && parentParams.type !== 'expense' ?
                <div>
                    <label className='entry-info-form-row'>
                        Monthly Limit:&nbsp;
                        <input className ='budget-input' type="text" required value={formInput.limit} onChange={(event)=>{setFormInput({...formInput, limit: event.target.value})}}/>
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
                </div>
            : null}
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
