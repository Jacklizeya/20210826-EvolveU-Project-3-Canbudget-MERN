import React, {useEffect, useState} from 'react'

import './RecurringPaymentForm.css'

import RecurringPaymentRow from './RecurringPaymentRow'
import RecurringPaymentSuggestions from './RecurringPaymentSuggestions'

export default function RecurringPaymentDetailsForm({sendDataToParent, questionPrompt, paymentName, enableAddRows, enableSuggestions}) {

  const defaultRowProps = {
    name: '',
    amount: '',
    frequency: '',
    frequencyType: '',
    billDate: '',
    contractEndDate: '',
    isEmpty: true,
    formId: ''
  }

  const [formArray, setFormArray] = useState([defaultRowProps])
  const [dataFromForm, setDataFromForm] = useState('')
  const [addRowsEnabled, setAddRowsEnabled] = useState(true)
  const [buttonText, setButtonText] = useState('Skip')

  useEffect(() => {
    if (enableAddRows !== undefined) setAddRowsEnabled(enableAddRows)
  },[enableAddRows])

  useEffect(() => {
    if (dataFromForm) {
      formArray[dataFromForm.formId] = dataFromForm
    }
    setDataFromForm('')
    if (!formArray[formArray.length - 1].isEmpty) {
      setButtonText('Submit')
      if (addRowsEnabled) {
        formArray.push(defaultRowProps)
      }
    }
  },[dataFromForm])

  return (
    <div className='recurring-payment-container'>
      {typeof questionPrompt === 'string' ? <p className='recurring-payment-prompt'>{questionPrompt}</p>: questionPrompt}
      {enableSuggestions ? <RecurringPaymentSuggestions/> : null}
      <form className='recurring-payment-form'>
          {formArray.map((formRow, i) => {
            return (
              formRow['formId'] = i,
              <RecurringPaymentRow
                key={i}
                sendDataToParent={(data) => {setDataFromForm(data)}} 
                parentData={formRow}
                paymentName={paymentName ? paymentName : ''}
              />
            )
          })}
      </form>
      <button 
        className='recurring-payment-button' 
        onClick={() => {sendDataToParent(formArray)}}
      >
        {buttonText}
      </button>
    </div>
  )
}
