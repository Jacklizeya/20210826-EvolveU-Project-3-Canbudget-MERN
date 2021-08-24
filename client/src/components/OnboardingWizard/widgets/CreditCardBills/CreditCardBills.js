import React, {useState, useEffect} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function CreditCardBills({sendDataToOnboard}) {

    const [readyForDb, setReadyForDb] = useState(false)
    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState({
        questions: {
            0: 'Do you have any credit cards?',
            1: 'Tell us about your credit cards:'
        },
        answers: {}
    })

    useEffect(() => {
        if (readyForDb) {
            let localMessage = confirmationMessage
            localMessage.widget = 'credit'
            sendDataToOnboard(localMessage)
            setReadyForDb(false)
        }
    },[readyForDb, confirmationMessage, sendDataToOnboard])

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => {setDisplayOnboardBody(!displayOnboardBody)}}>Credit Cards</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's set some reminders for your credit card bills</p>
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
                {confirmationMessage.answers[0] === true ? 
                    <div>
                        <RecurringPaymentForm
                            questionPrompt={confirmationMessage.questions[1]}
                            enableCompany={true} 
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
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
