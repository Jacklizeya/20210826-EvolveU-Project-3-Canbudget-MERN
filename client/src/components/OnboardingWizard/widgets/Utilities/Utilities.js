import React, {useState, useEffect} from 'react'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'
import RecurringPaymentDetailsForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

export default function Utilities({sendDataToOnboard}) {

  const [readyForDb, setReadyForDb] = useState(false)
  const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState({
    questions: {
      0: 'Do you have recurring utility bills?:',
      1: 'Tell us about your utility bills:'
    },
    answers: {}
  })

  useEffect(() => {
    if (readyForDb) {
        let localMessage = confirmationMessage
        localMessage.widget = 'utilities'
        sendDataToOnboard(localMessage)
        setReadyForDb(false)
    }
 },[readyForDb, confirmationMessage, sendDataToOnboard])

  return (
    <div className='onboard-container'>
      <h2 
        className='onboard-heading widget' 
        onClick={() => {setDisplayOnboardBody(!displayOnboardBody)}}
      >
        Utilties
      </h2>
      {displayOnboardBody ? <div>
        <p className='onboard-heading-body'>Keeping the lights on isn't free! Let's talk about your utilitiy bills</p>
        <BooleanRadioButtons 
          questionPrompt={confirmationMessage.questions[0]}
          sendDataToParent={(data) => {
            setConfirmationMessage({
              ...confirmationMessage,
              answers: {
                ...confirmationMessage.answers,
                0: data === 'true' ? true : false
              }
            })
          }}
        />
        {confirmationMessage.answers[0] ? 
          <RecurringPaymentDetailsForm
            questionPrompt={confirmationMessage.questions[1]}
            enableSuggestions={'utilities'}
            enableConfirmation={true}
            parentConfirmation={confirmationMessage}
            sendDataToParent={(data) => {
              if (data === true) {
                setReadyForDb(true)
              } else {
                setConfirmationMessage({
                  ...confirmationMessage,
                  answers: {
                    ...confirmationMessage.answers,
                    1: data
                  }
                })
              }
            }}
          /> 
        : null}
      </div> : null}
    </div>
  )
}
