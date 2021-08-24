import React, {useEffect, useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Subscriptions({sendDataToOnboard}) {

    const [readyForDb, setReadyForDb] = useState(false)
    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userHasSubscriptions, setUserHasSubscriptions] = useState(null)
    const [confirmationMessage, setConfirmationMessage] = useState({
        questions: {
            0: "Do you have any subscriptions? Common services include Netflix and Spotify:",
            1: "Tell us about your current subscriptions - we've provided some autofill buttons below:"
        },
        answers: {}
    })

    useEffect(() => {
        setConfirmationMessage(c => ({...c, answers: {...c.answers, 0: userHasSubscriptions}}))
    },[userHasSubscriptions])

    useEffect(() => {
        if (readyForDb) {
            let localMessage = confirmationMessage
            localMessage.widget = 'subscriptions'
            sendDataToOnboard(localMessage)
            setReadyForDb(false)
        }
    },[readyForDb, confirmationMessage, sendDataToOnboard])

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => setDisplayOnboardBody(!displayOnboardBody)}>Subscriptions</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's talk about what services you subscribe to</p>
                <BooleanRadioButtons 
                    questionPrompt={confirmationMessage.questions[0]}
                    sendDataToParent={(data) => {
                        data === 'true' ? setUserHasSubscriptions(true) : setUserHasSubscriptions(false)
                    }}
                />
                {userHasSubscriptions === true ? 
                    <div>
                        <RecurringPaymentForm 
                            sendDataToParent={(data) => {
                                if (data === true) {
                                    setReadyForDb(true)
                                } else {
                                    setConfirmationMessage({...confirmationMessage, answers: {...confirmationMessage.answers, 1: data}})
                                }
                            }}
                            questionPrompt={confirmationMessage.questions[1]}
                            enableSuggestions={'subscriptions'}
                            enableConfirmation={true}
                            parentConfirmation={confirmationMessage}
                        />
                    </div>
                : null}
            </div> : null }
        </div>
    )
}
