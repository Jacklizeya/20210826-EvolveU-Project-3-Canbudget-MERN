import React, {useEffect, useState} from 'react'

import './RecurringPaymentForm.css'

export default function RecurringPaymentRow({parentData, sendDataToParent, paymentName}) {

  const [rowProps, setRowProps] = useState(parentData)

  useEffect(() => {
    setRowProps(parentData)
  })

  useEffect(() => {
    setRowProps(r => ({...r, name: paymentName}))
    if (paymentName) {
      let nameInputHtml = document.getElementsByClassName('recurring-payment-field name')
      for (let i in nameInputHtml) {
        if (nameInputHtml[i].defaultValue === paymentName) {
          nameInputHtml[i].disabled = true
        }
      }
    }
  }, [paymentName])

  useEffect(() => {
    sendDataToParent(rowProps)
  }, [rowProps.name, rowProps.amount, rowProps.frequency,rowProps.frequencyType, rowProps.billDate, rowProps.contractEndDate, rowProps.isEmpty])

  return (
    <tr className='recurring-payment-row'>
      <label className='recurring-payment-label'>
        {parentData.formId === 0 ? 'Payment Name' : null}
        <input 
          className='recurring-payment-field name'
          type='text'
          placeholder='Name'
          value={rowProps.name}
          onChange={(event) => {
            setRowProps({...rowProps, name: event.target.value, isEmpty: false})
          }}
        ></input>
      </label>
      <label className='recurring-payment-label'>
        {parentData.formId === 0 ? 'Value' : null}
        <input 
          className='recurring-payment-field'
          type='number'
          placeholder='$ Amount'
          min='0'
          value={rowProps.amount}
          onChange={(event) => {
            setRowProps({...rowProps, amount: event.target.value, isEmpty: false})
          }}
        ></input>
      </label>
      <label className='recurring-payment-label'>
      {parentData.formId === 0 ? 'Frequency' : null}
        <div className='recurring-payment-frequency-box'>
          <input
            className='recurring-payment-frequency-inputs number'
            type='number'
            placeholder='#'
            min='0'
            value={rowProps.frequency}
            onChange={(event) => {
              setRowProps({...rowProps, frequency: event.target.value, isEmpty: false})
            }}
          ></input>
          <select
            className='recurring-payment-frequency-inputs'
            placeholder='Frequency Type'
            value={rowProps.frequencyType} 
            onChange={(event) => {
              setRowProps({...rowProps, frequencyType: event.target.value, isEmpty: false})
            }}
          >
            <option value='' disabled defaultValue>Frequency</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </label>
      <label className='recurring-payment-label'>
        {parentData.formId === 0 ? 'Bill Date' : null}
        <input
          className='recurring-payment-field'
          type='date'
          placeholder='Bill Date'
          value={rowProps.billDate}
          onChange={(event) => {
            setRowProps({...rowProps, billDate: event.target.value, isEmpty: false})
          }}
        ></input>
      </label>
      <label className='recurring-payment-label'>
        {parentData.formId === 0 ? 'Contract End Date' : null}
        <input
          className='recurring-payment-field'
          type='date'
          placeholder='Contract End Date'
          value={rowProps.contractEndDate}
          onChange={(event) => {
            setRowProps({...rowProps, contractEndDate: event.target.value, isEmpty: false})
          }}
        ></input>
      </label>
    </tr>
  )
}
