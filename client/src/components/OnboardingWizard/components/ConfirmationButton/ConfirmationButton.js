import React, {useEffect, useState} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import './ConfirmationButton.css' // Import css

// import '../RecurringPaymentForm/RecurringPaymentForm.css'

export default function ConfirmationButton({parentConfirmation, dataConfirmed}) {
 
  const [alertSettings, setAlertSettings] = useState({
    title: <div className='confirmation-heading'>Please confirm your information before submitting</div>,
    message: (
      'No data entered'
    ),
    buttons: [
      {
        label: 'Yes',
        onClick: () => dataConfirmed(true)
      },
      {
        label: 'No',
        onClick: () => alert('Data not submitted. Please try again!')
      }
    ]
  })


  useEffect(() => {
    let localConfirmation = parentConfirmation
    for (let i in localConfirmation.answers) {
      if (typeof localConfirmation.answers[i] === 'object') {
        let displayConfirmation = []
        let confirmationKeysArray = []
        if (localConfirmation.answers[i] !== null) {
          for (let j in Object.keys(localConfirmation.answers[i][0])) {
            confirmationKeysArray.push(Object.keys(localConfirmation.answers[i][0])[j])
          }
          let activeKeysArray = []
          for (let j in localConfirmation.answers[i]) {
            for (let k in localConfirmation.answers[i][j]) {
              if (localConfirmation.answers[i][j][k]) {
                activeKeysArray.push(k)
              }
            }
          }
          activeKeysArray = [...new Set(activeKeysArray)]
          activeKeysArray = activeKeysArray.filter(e => (e !== 'formId' && e !== 'isEmpty'))
          for (let j in localConfirmation.answers[i]) {
            if (!localConfirmation.answers[i][j].isEmpty) {
              let localObject = {}
              for (let k in localConfirmation.answers[i][j]) {
                for (let x in activeKeysArray) {
                  if (k === activeKeysArray[x]) {
                    localObject[k] = localConfirmation.answers[i][j][k]
                  }
                }
              }
              displayConfirmation.push(localObject)
            }
          }
          localConfirmation.answers[i] = displayConfirmation
        }
      }
    }

    let confirmationMessageString = '<div>'
    if (Object.keys(localConfirmation.questions).length === Object.keys(localConfirmation.answers).length) {
      let objectLength = Object.keys(localConfirmation.questions).length
      for (let i = 0; i < objectLength; i++) {
        confirmationMessageString = confirmationMessageString + '<strong>' + localConfirmation.questions[i] + '</strong><br></br>'
        if (localConfirmation.answers[i] === true) {
          confirmationMessageString = confirmationMessageString + 'Yes<br></br>'
        } else if (localConfirmation.answers[i] === false) {
          confirmationMessageString = confirmationMessageString + 'No<br></br>'
        } else if (typeof localConfirmation.answers[i] === 'object') {
            confirmationMessageString = confirmationMessageString + '<table class="budget-table"><body><tr class="table-title-row">'
            for (let j in localConfirmation.answers[i][0]) {
              confirmationMessageString = confirmationMessageString + '<th>' + j + '</th>'
            }
            for (let k in localConfirmation.answers[i]) {
              confirmationMessageString = confirmationMessageString + '<tr>'
              for (let j in localConfirmation.answers[i][k]) {
                confirmationMessageString = confirmationMessageString + '<td>' + localConfirmation.answers[i][k][j] + '</td>'
              }
            }
            confirmationMessageString = confirmationMessageString + '</tr>'
              + '</tbody></table>'
        }
      }
    } else {
      console.log('Questions and answers not of equal size')
    }
    confirmationMessageString = confirmationMessageString + '</div>'
    const jsx = <div dangerouslySetInnerHTML={{__html: confirmationMessageString}}></div>

    setAlertSettings(a => ({...a, message: jsx}))
  },[parentConfirmation])

  return (
    <div className='confirmation-container'>
      <button 
        className='recurring-payment-button'
        onClick={() => confirmAlert(alertSettings)}>Submit</button>
    </div>
  )
}
