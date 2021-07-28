import React, {useState} from 'react'

import UserOwnsHomeForm from './UserOwnsHomeForm'
import PaymentDetailsForm from './PaymentDetailsForm'

import UserHasInsuranceForm from './UserHasInsuranceForm'

import BooleanRadioButtons from '../BooleanRadioButtons'

export default function Shelter() {

    const [userOwnsHome, setUserOwnsHome] = useState(null)
    const [userPaymentDetailsEntered, setUserPaymentDetailsEntered] = useState(false)

    const handleDataFromUserOwnsHome = (data) => {
        data === 'true' ? setUserOwnsHome(true) : setUserOwnsHome(false)
    }

    const handlePaymenDetailsSubmit = (event) => {
        setUserPaymentDetailsEntered(true)
    }

    return (
        <div className='onboard-container'>
            <h3 className='onboard-heading'>Let's start by answering a few questions about your home.</h3>
            <BooleanRadioButtons sendDataToParent={handleDataFromUserOwnsHome} questionPrompt='Do you own your own home?'/>
            {userOwnsHome !== null ? (
                <div>
                    <PaymentDetailsForm userOwnsHome={userOwnsHome}/>
                    <button onClick={handlePaymenDetailsSubmit}>Click here when you're ready to move on</button>
                </div>
            ): null}
            {userPaymentDetailsEntered ? 
                <BooleanRadioButtons questionPrompt='Do you have home insurance?'/> 
                : null
            }
        </div>
    )
}
