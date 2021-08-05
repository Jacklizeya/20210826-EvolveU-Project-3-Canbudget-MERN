import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function CreditCardBills() {

    const [userHasBills, setUserHasBills] = useState(null)
    const [userBillDetailsEntered, setUserBillDetailsEntered] = useState(false)

    const handleDataFromUserHasBills = (data) => {
        data === 'true' ? setUserHasBills(true) : setUserHasBills(false)
    }

    const handleRentDetailsSubmit = (event) => {
        setUserBillDetailsEntered(true)
    }

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading'>Let's set some reminders for your credit card bills</h2>
            <BooleanRadioButtons sendDataToParent={handleDataFromUserHasBills} questionPrompt='Do you have any credit cards?'/>
            {userHasBills === true ? 
                <div>
                    <RecurringPaymentForm sendDataToParent={handleRentDetailsSubmit} questionPrompt='Tell us about your credit cards:'/>
                </div>
            : null}
        </div>
    )
}
