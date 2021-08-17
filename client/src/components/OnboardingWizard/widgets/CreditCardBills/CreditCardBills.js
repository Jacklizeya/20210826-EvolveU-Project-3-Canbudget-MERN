import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function CreditCardBills() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userHasBills, setUserHasBills] = useState(null)
    const [userBillDetails, setUserBillDetails] = useState(null)
    const [confirmationMessage, setConfirmationMessage] = useState([
        {q: 'Do you have any credit cards?', a: userHasBills},
        {q: 'Tell us about your credit cards:', a: userBillDetails}
    ])

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => {setDisplayOnboardBody(!displayOnboardBody)}}>Credit Cards</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's set some reminders for your credit card bills</p>
                <BooleanRadioButtons
                    questionPrompt='Do you have any credit cards?' 
                    sendDataToParent={(data) => data === 'true' ? setUserHasBills(true) : setUserHasBills(false)} 
                />
                {userHasBills === true ? 
                    <div>
                        <RecurringPaymentForm
                            questionPrompt='Tell us about your credit cards:'
                            enableCompany={true} 
                            enableConfirmation={true}
                            sendDataToParent={(data) => setUserBillDetails(data)} 
                        />
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
