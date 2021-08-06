import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Subscriptions() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userOwnsHome, setUserOwnsHome] = useState(null)
    const [userRentDetailsEntered, setUserRentDetailsEntered] = useState(false)
    const [userHasInsurance, setUserHasInsurance] = useState(null)

    const handleDataFromUserOwnsHome = (data) => {
        data === 'true' ? setUserOwnsHome(true) : setUserOwnsHome(false)
    }

    const handleRentDetailsSubmit = (event) => {
        setUserRentDetailsEntered(true)
    }

    const handleDataFromUserHasInsurance = (data) => {
        data === 'true' ? setUserHasInsurance(true) : setUserHasInsurance(false)
    }

    const handleInsuranceDetailsSubmit = (event) => {
        setUserRentDetailsEntered(true)
    }

    const handleHeaderClick = (event) => {
        setDisplayOnboardBody(!displayOnboardBody)
    }

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading' onClick={handleHeaderClick}>Subscriptions</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's talk about what services you subscribe to</p>
                <BooleanRadioButtons sendDataToParent={handleDataFromUserOwnsHome} questionPrompt='Do you have any subscriptions? Common services include Netflix and Spotify:'/>
                {userOwnsHome === true ? 
                    <div>
                        <RecurringPaymentForm sendDataToParent={handleRentDetailsSubmit} questionPrompt='Tell us about your current subscriptions:'/>
                    </div>
                : null}
            </div> : null }
        </div>
    )
}
