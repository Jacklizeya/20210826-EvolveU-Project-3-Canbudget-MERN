import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function OtherAssets() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState({
        questions: {
            0: 'Do you have any other large assets you would like to track?',
            1: 'Tell us about your assets:'
        },
        answers: {}
    })
    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => setDisplayOnboardBody(!displayOnboardBody)}>Other Assets</h2>
            {displayOnboardBody ? <div>
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
                            enableAssetsOnly={true}
                            enableConfirmation={true}
                            parentConfirmation={confirmationMessage}
                            sendDataToParent={(data) => {
                                setConfirmationMessage({
                                    ...confirmationMessage,
                                    answers: {
                                      ...confirmationMessage.answers,
                                      1: data
                                    }
                                })
                            }} 
                        />
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
