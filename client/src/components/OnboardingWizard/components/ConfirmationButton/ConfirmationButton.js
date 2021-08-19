import React, {useEffect, useState} from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function ConfirmationButton({parentConfirmation}) {
 
  const [alertSettings, setAlertSettings] = useState({
    title: 'Confirm to submit',
    message: (
      // <div>
      //   <p>No data entered</p>
      // </div>
      'No data entered'
    ),
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
    let confirmationMessageString = '<div>'
    if (Object.keys(parentConfirmation.questions).length === Object.keys(parentConfirmation.answers).length) {
      let objectLength = Object.keys(parentConfirmation.questions).length
      for (let i = 0; i < objectLength; i++) {
        confirmationMessageString = confirmationMessageString + '<strong>' + parentConfirmation.questions[i] + '</strong><br></br>'
        if (parentConfirmation.answers[i] === true) {
          confirmationMessageString = confirmationMessageString + 'Yes<br></br>'
        } else if (parentConfirmation.answers[i] === false) {
          confirmationMessageString = confirmationMessageString + 'No<br></br>'
        } else if (typeof parentConfirmation.answers[i] === 'object') {
          console.log('Design table')
        }
      }
    } else {
      console.log('Questions and answers not of equal size')
    }
    confirmationMessageString = confirmationMessageString + '</div>'
    // setAlertSettings(as => ({...as, message: confirmationMessageString}))
    console.log(confirmationMessageString)
    const jsx = <div dangerouslySetInnerHTML={{__html: confirmationMessageString}}></div>
    setAlertSettings(a => ({...a, message: jsx}))
  },[parentConfirmation])

  // useEffect(() => {
  //   let confirmationMessageString = ''
  //   if (Object.keys(parentConfirmation.questions).length === Object.keys(parentConfirmation.answers).length) {
  //     let objectLength = Object.keys(parentConfirmation.questions).length
  //     for (let i = 0; i < objectLength; i++) {
  //       confirmationMessageString = confirmationMessageString + parentConfirmation.questions[i]
  //     }
  //   } else {
  //     console.log('Questions and answers not of equal size')
  //   }
  //   // setAlertSettings(as => ({...as, message: confirmationMessageString}))
  //   console.log(confirmationMessageString)
  //   setAlertSettings(a => ({...a, message: confirmationMessageString}))
  // },[parentConfirmation])


  return (
    <div className='confirmation-container'>
      <button 
        className='recurring-payment-button'
        onClick={() => confirmAlert(alertSettings)}>Submit</button>
    </div>
  )
}
