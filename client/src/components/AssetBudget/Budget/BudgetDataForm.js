import React from 'react'

export default function BudgetDataForm() {
  
  return (
    <form className='entry-info-form' onSubmit={(event) => addNewCashFlow(event, user._id)}>
      <h3 className= 'entry-info-form-header'>Add New Item / Edit Existing Item</h3>
      <label className='entry-info-form-row'>
          Item Name:&nbsp;
          <input className ='budget-input' type="text" required value={name} onChange={(event)=>{setName(event.target.value)}}/>
      </label>
      <label className='entry-info-form-row'>
          Type:&nbsp;
          <select className='budget-input' value={type} required onChange={(event)=>{setType(event.target.value)}}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
              <option value="recurring-payment">Recurring Payment</option>
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
  )
}
