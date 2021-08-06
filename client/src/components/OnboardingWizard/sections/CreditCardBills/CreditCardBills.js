import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function CreditCardBills() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userHasBills, setUserHasBills] = useState(null)
    const [userBillDetailsEntered, setUserBillDetailsEntered] = useState(false)

    const handleDataFromUserHasBills = (data) => {
        data === 'true' ? setUserHasBills(true) : setUserHasBills(false)
    }

    const handleRentDetailsSubmit = (event) => {
        setUserBillDetailsEntered(true)
    }

    const handleHeaderClick = (event) => {
        setDisplayOnboardBody(!displayOnboardBody)
    }

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading' onClick={handleHeaderClick}>Credit Cards</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's set some reminders for your credit card bills</p>
                <BooleanRadioButtons sendDataToParent={handleDataFromUserHasBills} questionPrompt='Do you have any credit cards?'/>
                {userHasBills === true ? 
                    <div>
                        <RecurringPaymentForm sendDataToParent={handleRentDetailsSubmit} questionPrompt='Tell us about your credit cards:'/>
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
