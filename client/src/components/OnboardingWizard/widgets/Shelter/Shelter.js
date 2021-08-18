import React, {useEffect, useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Shelter() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userOwnsHome, setUserOwnsHome] = useState(null)
    const [userRentDetails, setUserRentDetails] = useState(null)
    const [userHasInsurance, setUserHasInsurance] = useState(null)
    const [userInsuranceDetails, setUserInsuranceDetails] = useState(null)
    const [confirmationMessage, setConfirmationMessage] = useState({
        questions: {
            0: 'Do you own your own home?:',
            1: '',
            2: 'Do you have home insurance?',
            3: 'Tell us about your home insurance payment:'
        },
        answers: {}
    })

    useEffect(() => {
        if (userOwnsHome) {
            setConfirmationMessage(c => ({...c, questions: {...c.questions, 1: 'Tell us about your mortgage payment:'}}))
        } else {
            setConfirmationMessage(c => ({...c, questions: {...c.questions, 1: "Tell us about your rental situation - if you don't pay rent enter $0:"}}))
        }
    },[userOwnsHome])

    useEffect(() => {
        setConfirmationMessage(c => ({...c, answers: {0: userOwnsHome, 1: userRentDetails, 2: userHasInsurance, 3: userInsuranceDetails}}))
    },[userOwnsHome, userRentDetails, userHasInsurance, userInsuranceDetails])


    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => {setDisplayOnboardBody(!displayOnboardBody)}}>Shelter</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's start by answering a few questions about your monthly shelter expenses</p>
                <BooleanRadioButtons
                    questionPrompt={confirmationMessage.questions[0]}
                    sendDataToParent={(data) => {
                        data === 'true' ? setUserOwnsHome(true) : setUserOwnsHome(false)
                    }}
                />
                {userOwnsHome !== null ?
                    <div>
                        <RecurringPaymentForm
                            questionPrompt={confirmationMessage.questions[1]}
                            paymentName={userOwnsHome === true ? 
                                'Mortgage' : 
                                "Rent"
                            }
                            enableAddRows={false}
                            sendDataToParent={(data) => {
                                setUserRentDetails(data[0])
                            }}
                        /> 
                    </div>
                : null}
                {userRentDetails !== null ?
                    <div> 
                        <BooleanRadioButtons 
                            sendDataToParent={(data) => {
                                data === 'true' ? setUserHasInsurance(true) : setUserHasInsurance(false)
                            }} 
                            questionPrompt={confirmationMessage.questions[2]}
                            enableAddRows={false}
                        />
                        {userHasInsurance ? 
                            <RecurringPaymentForm
                                questionPrompt={confirmationMessage.questions[3]}
                                paymentName='Home Insurance'
                                enableAddRows={false}
                                enableConfirmation={true}
                                parentConfirmation={confirmationMessage}
                                sendDataToParent={(data) => {
                                    setUserInsuranceDetails(data[0])
                                }}
                            /> : null
                        }
                    </div> 
                    : null}
            </div> : null}
        </div>
    )
}
