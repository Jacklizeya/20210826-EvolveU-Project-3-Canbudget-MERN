import React, {useEffect, useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'
import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Transportation({sendDataToOnboard}) {

  const [readyForDb, setReadyForDb] = useState(false)
  const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState({
    questions: {
      0: 'Do you own your own vehicle?:',
      1: 'Do you make payments on your vehicle?',
      2: 'Tell us about your vehicle payment:',
      3: 'Do you have vehicle insurance?',
      4: 'Tell us about your vehicle insurance:',
      5: 'Do you have other costs related to transportation?',
      6: 'Tell us about your transportation costs (common expenses include transit passes or Uber costs)'
    },
    answers: {}
  })

  useEffect(() => {
    if (readyForDb) {
        let localMessage = confirmationMessage
        localMessage.widget = 'transportation'
        sendDataToOnboard(localMessage)
        setReadyForDb(false)
    }
  },[readyForDb, confirmationMessage, sendDataToOnboard])

  return (
    <div className='onboard-container'>
      <h2 className='onboard-heading widget' onClick={() => setDisplayOnboardBody(!displayOnboardBody)}>Transportation</h2>
      {displayOnboardBody ? <div>
        <p className='onboard-heading-body'>Everyone needs to get around somehow! Let's talk about your expenses related to transportation</p>
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
          <div> 
            <BooleanRadioButtons
              questionPrompt={confirmationMessage.questions[1]} 
              sendDataToParent={(data) => {
                setConfirmationMessage({
                  ...confirmationMessage, 
                  answers: {
                    ...confirmationMessage.answers,
                    1: data === 'true' ? true : false
                  }
                })
              }} 
            />
            {confirmationMessage.answers[1] ? 
              <RecurringPaymentForm
                questionPrompt={confirmationMessage.questions[2]}
                paymentName='Vehicle Payment' 
                enableAddRows={false}
                sendDataToParent={(data) => {
                  setConfirmationMessage({
                    ...confirmationMessage, 
                    answers: {
                      ...confirmationMessage.answers,
                      2: data
                    }
                  })
                }}
              /> 
            : null}
            {confirmationMessage.answers[2] ? 
              <div>
                <BooleanRadioButtons
                  questionPrompt={confirmationMessage.questions[3]}
                  sendDataToParent={(data) => {
                    setConfirmationMessage({
                      ...confirmationMessage, 
                      answers: {
                        ...confirmationMessage.answers,
                        3: data === 'true' ? true : false
                      }
                    })
                  }}
                />
                {confirmationMessage.answers[3] ? 
                  <RecurringPaymentForm
                    questionPrompt={confirmationMessage.questions[4]}
                    paymentName='Vehicle Insurance'
                    enableAddRows={false}
                    enableConfirmation={false}
                    parentConfirmation={confirmationMessage}
                    sendDataToParent={(data) => {
                      setConfirmationMessage({
                        ...confirmationMessage, 
                        answers: {
                          ...confirmationMessage.answers,
                          4: data
                        }
                      })
                    }}
                  />
                : null}
              </div>
            : null}
          </div>
        : null}
        {(confirmationMessage.answers[0] === false || confirmationMessage.answers[1] === false|| confirmationMessage.answers[2] === false || confirmationMessage.answers[4]) ? 
          <BooleanRadioButtons
            questionPrompt={confirmationMessage.questions[5]}
            sendDataToParent={(data) => {
              setConfirmationMessage({
                ...confirmationMessage, 
                answers: {
                  ...confirmationMessage.answers,
                  5: data === 'true' ? true : false
                }
              })
            }}
          />
        : null}
        {confirmationMessage.answers[5] ?
          <RecurringPaymentForm
            questionPrompt={confirmationMessage.questions[6]}
            enableAddRows={true}
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
                    6: data
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
