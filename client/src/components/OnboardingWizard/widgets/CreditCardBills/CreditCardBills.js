import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function CreditCardBills() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userHasBills, setUserHasBills] = useState(null)
    const [userBillDetailsEntered, setUserBillDetailsEntered] = useState(false)

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
                            sendDataToParent={() => setUserBillDetailsEntered(true)} 
                        />
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
