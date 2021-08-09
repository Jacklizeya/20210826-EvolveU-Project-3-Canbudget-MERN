import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Shelter() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userOwnsHome, setUserOwnsHome] = useState(null)
    const [userRentDetails, setUserRentDetails] = useState(null)
    const [userHasInsurance, setUserHasInsurance] = useState(null)
    const [userInsuranceDetails, setUserInsuranceDetails] = useState(null)

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading' onClick={() => {setDisplayOnboardBody(!displayOnboardBody)}}>Shelter</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's start by answering a few questions about your monthly shelter expenses</p>
                <BooleanRadioButtons 
                    sendDataToParent={(data) => {
                        data === 'true' ? setUserOwnsHome(true) : setUserOwnsHome(false)
                    }} 
                    questionPrompt='Do you own your own home?:'
                />
                {userOwnsHome !== null ? 
                    <div>
                        <RecurringPaymentForm
                            sendDataToParent={(data) => {
                                setUserRentDetails(data[0])
                            }} 
                            questionPrompt={ userOwnsHome === true ? 
                                'Tell us about your mortgage payment:' : 
                                "Tell us about your rental situation - if you don't pay rent enter $0:"
                            }
                            enableAddRows={false}
                        />
                    </div>
                : null}
                {userRentDetails !== null ?
                    <div> 
                        <BooleanRadioButtons 
                            sendDataToParent={(data) => {
                                data === 'true' ? setUserHasInsurance(true) : setUserHasInsurance(false)
                            }} 
                            questionPrompt='Do you have home insurance?'
                            enableAddRows={false}
                        />
                        {userHasInsurance ? 
                            <RecurringPaymentForm
                                sendDataToParent={(data) => {
                                    setUserInsuranceDetails(data[0])
                                }}
                                questionPrompt='Tell us about your home insurance payment:'
                                enableAddRows={false}
                            /> : null
                        }
                    </div> 
                    : null}
            </div> : null}
        </div>
    )
}
