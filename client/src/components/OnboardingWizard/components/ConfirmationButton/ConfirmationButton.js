import React, {useEffect, useState} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function ConfirmationButton({parentConfirmation}) {
 
  const [alertSettings, setAlertSettings] = useState({
    title: 'Confirm to submit',
    message: 'No data submitted',
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
  })

  useEffect(() => {
    let confirmationMessageArray = []
    if (Object.keys(parentConfirmation.questions).length === Object.keys(parentConfirmation.answers).length) {
      let objectLength = Object.keys(parentConfirmation.questions).length
      for (let i = 0; i < objectLength; i++) {
        confirmationMessageArray.push(<p>{parentConfirmation.questions[i]}</p>)
        if (typeof parentConfirmation.answers[i] === 'object') {
          confirmationMessageArray.push(<p>Table goes here</p>)
          // console.log(parentConfirmation.answers[i])
        } else if (parentConfirmation.answers[i] === true) {
          confirmationMessageArray.push(<p>Yes</p>)
        } else if (parentConfirmation.answers[i] === false) {
          confirmationMessageArray.push(<p>No</p>)
        }
      }
    } else {
      console.log('Questions and answers not of equal size')
    }
    setAlertSettings({...alertSettings, message: confirmationMessageArray})
  })

  return (
    <div className='confirmation-container'>
      <button 
        className='recurring-payment-button'
        onClick={() => confirmAlert(alertSettings)}>Submit</button>
    </div>
  )
}
