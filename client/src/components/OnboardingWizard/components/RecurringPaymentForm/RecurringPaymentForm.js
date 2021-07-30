import React, {useState} from 'react'

import './RecurringPaymentForm.css'

export default function RecurringPaymentDetailsForm({sendDataToParent, questionPrompt}) {

  const [amount, setAmount] = useState(null)
  const [frequency, setFrequency] = useState(null)
  const [frequencyType, setFrequencyType] = useState(null)
  const [billDate, setBillDate] = useState(null)
  const [contractEndDate, setContractEndDate] = useState(null)

  const handleSubmit = (event) => {
    sendDataToParent({
      submit: true,
      data: {
        amount: amount,
        frequency: frequency,
        frequencyType: frequencyType,
        billDate: billDate,
        contractEndDate: contractEndDate
      }
    })
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value)
  }
  
  const handleFrequencyTypeChange = (event) => {
    setFrequencyType(event.target.value)
  }

  const handleBillDateChange = (event) => {
    setBillDate(event.target.value)
  }
  
  const handleContractEndDateChange = (event) => {
    setContractEndDate(event.target.value)
  }

  return (
    <div className='recurring-payment-container'>
      {typeof questionPrompt === 'string' ? <p className='recurring-payment-prompt'>{questionPrompt}</p>: questionPrompt}
      <form className='recurring-payment-form'>
        <input className='recurring-payment-field' type='number' placeholder='$ Amount' value={amount} onChange={handleAmountChange}></input>
        <div className='recurring-payment-frequency-box'>
          <input className='recurring-payment-frequency-inputs' type='number' placeholder='Frequency' value={frequency} onChange={handleFrequencyChange}></input>
          <select className='recurring-payment-frequency-inputs' placeholder='Frequency Type' value={frequencyType} onChange={handleFrequencyTypeChange}>
            <option value={null} disabled selected>Frequency Type</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
        <input className='recurring-payment-field' type='date' placeholder='Bill Date' value={billDate} onChange={handleBillDateChange}></input>
        <input className='recurring-payment-field' type='date' placeholder='Contract End Date' value={contractEndDate} onChange={handleContractEndDateChange}></input>
      </form>
      <div className='recurring-payment-buttons-container'>
        <button className='recurring-payment-button' onClick={handleSubmit}>ADD ROW</button>
        <button className='recurring-payment-button' onClick={handleSubmit}>Click here when you're ready to move on<br></br>Don't worry if the form is incomplete - we will remind you later!</button>
      </div> 
    </div>
  )
}
