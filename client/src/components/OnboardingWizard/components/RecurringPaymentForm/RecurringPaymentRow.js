import React, {useEffect, useState} from 'react'

import './RecurringPaymentForm.css'

export default function RecurringPaymentRow({parentData, sendDataToParent}) {

  const [rowProps, setRowProps] = useState(parentData)


  useEffect(() => {
    sendDataToParent(rowProps)
  }, [rowProps.amount, rowProps.frequency,rowProps.frequencyType, rowProps.billDate, rowProps.contractEndDate, rowProps.isEmpty])

  const handleAmountChange = (event) => {
    setRowProps({...rowProps, amount: event.target.value, isEmpty: false})
  }

  const handleFrequencyChange = (event) => {
    setRowProps({...rowProps, frequency: event.target.value, isEmpty: false})
  }
  
  const handleFrequencyTypeChange = (event) => {
    setRowProps({...rowProps, frequencyType: event.target.value, isEmpty: false})
  }

  const handleBillDateChange = (event) => {
    setRowProps({...rowProps, billDate: event.target.value, isEmpty: false})
  }
  
  const handleContractEndDateChange = (event) => {
    setRowProps({...rowProps, contractEndDate: event.target.value, isEmpty: false})
  }

  return (
    <div className='recurring-payment-row'>
      <input className='recurring-payment-field' type='number' placeholder='$ Amount' value={rowProps.amount} onChange={handleAmountChange}></input>
      <div className='recurring-payment-frequency-box'>
        <input className='recurring-payment-frequency-inputs number' type='number' placeholder='#' value={rowProps.frequency} onChange={handleFrequencyChange}></input>
        <select className='recurring-payment-frequency-inputs' placeholder='Frequency Type' value={rowProps.frequencyType} onChange={handleFrequencyTypeChange}>
          <option value='' disabled defaultValue>Frequency</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
          <option value="years">Years</option>
        </select>
      </div>
      <input className='recurring-payment-field' type='date' placeholder='Bill Date' value={rowProps.billDate} onChange={handleBillDateChange}></input>
      <input className='recurring-payment-field' type='date' placeholder='Contract End Date' value={rowProps.contractEndDate} onChange={handleContractEndDateChange}></input>
    </div>
  )
}
