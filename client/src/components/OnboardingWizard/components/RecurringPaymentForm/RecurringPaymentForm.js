import React, {useEffect, useState} from 'react'

import './RecurringPaymentForm.css'

import RecurringPaymentRow from './RecurringPaymentRow'

export default function RecurringPaymentDetailsForm({sendDataToParent, questionPrompt, enableAddRows}) {

  const defaultRowProps = {
    amount: null,
    frequency: null,
    frequencyType: null,
    billDate: null,
    contractEndDate: null,
    isEmpty: true,
    formId: null
  }

  const [formArray, setFormArray] = useState([defaultRowProps])
  const [dataFromForm, setDataFromForm] = useState(null)
  const [addRowsEnabled, setAddRowsEnabled] = useState(true)
  const [buttonText, setButtonText] = useState('Skip')

  const handleDataFromRow = (data) => {
    setDataFromForm(data)
  }

  useEffect(() => {
    if (enableAddRows !== undefined) {
      setAddRowsEnabled(enableAddRows)
    }
  },[enableAddRows])

  useEffect(() => {
    if (dataFromForm) {
      formArray[dataFromForm.formId] = dataFromForm
    }
    setDataFromForm(null)
    if (!formArray[formArray.length - 1].isEmpty) {
      setButtonText('Submit')
      if (addRowsEnabled) {
        formArray.push(defaultRowProps)
      }
    }
  },[dataFromForm])

  const handleSubmit = (event) => {
    sendDataToParent(formArray)
  }

  return (
    <div className='recurring-payment-container'>
      {typeof questionPrompt === 'string' ? <p className='recurring-payment-prompt'>{questionPrompt}</p>: questionPrompt}
      <form className='recurring-payment-form'>
          {formArray.map((formRow, i) => {
            return (
              formRow['formId'] = i,
              <RecurringPaymentRow key={i} sendDataToParent={handleDataFromRow} parentData={formRow}/>
            )
          })}
      </form>
      <button className='recurring-payment-button' onClick={handleSubmit}>{buttonText}</button>
    </div>
  )
}
