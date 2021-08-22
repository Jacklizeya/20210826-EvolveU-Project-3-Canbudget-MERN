import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Shelter() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState({
        questions: {
            0: 'Do you own your own home?:',
            1: '',
            2: 'Do you have home insurance?',
            3: 'Tell us about your home insurance payment:'
        },
        answers: {}
    })


    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => {setDisplayOnboardBody(!displayOnboardBody)}}>Shelter</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's start by answering a few questions about your monthly shelter expenses</p>
                <BooleanRadioButtons
                    questionPrompt={confirmationMessage.questions[0]}
                    sendDataToParent={(data) => {
                        setConfirmationMessage({
                            ...confirmationMessage,
                            questions: {
                                ...confirmationMessage.questions,
                                1: data === 'true' ? 'Tell us about your mortgage payment:' : "Tell us about your rental situation - if you don't pay rent enter $0:"
                            },
                            answers: {
                                ...confirmationMessage.answers,
                                0: data === 'true' ? true : false
                            }
                        })
                    }}
                />
                {confirmationMessage.answers[0] ?
                    <div>
                        <RecurringPaymentForm
                            questionPrompt={confirmationMessage.questions[1]}
                            paymentName={confirmationMessage.answers[0] ? 
                                'Mortgage' : 
                                "Rent"
                            }
                            enableAddRows={false}
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
                {confirmationMessage.answers[1] ?
                    <div> 
                        <BooleanRadioButtons 
                            sendDataToParent={(data) => {
                                setConfirmationMessage({
                                    ...confirmationMessage,
                                    answers: {
                                        ...confirmationMessage.answers,
                                        2: data === 'true' ? true : false
                                    }
                                })
                            }}
                            questionPrompt={confirmationMessage.questions[2]}
                            enableAddRows={false}
                        />
                        {confirmationMessage.answers[2] ? 
                            <RecurringPaymentForm
                                questionPrompt={confirmationMessage.questions[3]}
                                paymentName='Home Insurance'
                                enableAddRows={false}
                                enableConfirmation={true}
                                parentConfirmation={confirmationMessage}
                                sendDataToParent={(data) => {
                                    setConfirmationMessage({
                                        ...confirmationMessage,
                                        answers: {
                                            ...confirmationMessage.answers,
                                            3: data
                                        }
                                    })
                                }}
                            /> : null
                        }
                    </div> 
                    : null}
            </div> : null}
        </div>
    )
}
