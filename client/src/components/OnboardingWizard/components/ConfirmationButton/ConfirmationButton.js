import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function ConfirmationButton() {

  const alertSettings = {
    title: 'Confirm to submit',
    message: 'Please ensure the following information is correct:',
    buttons: [
      {
        label: 'Yes',
        onClick: () => alert('Click Yes')
      },
      {
        label: 'No',
        onClick: () => alert('Click No')
      }
    ]
  }

  return (
    <div className='confirmation-container'>
      <button 
        className='recurring-payment-button'
        onClick={() => confirmAlert(alertSettings)}>Submit</button>
    </div>
  )
}
