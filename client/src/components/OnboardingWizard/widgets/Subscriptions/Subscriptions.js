import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Subscriptions() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userHasSubscriptions, setUserHasSubscriptions] = useState(null)

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => setDisplayOnboardBody(!displayOnboardBody)}>Subscriptions</h2>
            {displayOnboardBody ? <div>
                <p className='onboard-heading-body'>Let's talk about what services you subscribe to</p>
                <BooleanRadioButtons 
                    questionPrompt='Do you have any subscriptions? Common services include Netflix and Spotify:'
                    sendDataToParent={(data) => {
                        data === 'true' ? setUserHasSubscriptions(true) : setUserHasSubscriptions(false)
                    }}
                />
                {userHasSubscriptions === true ? 
                    <div>
                        <RecurringPaymentForm 
                            sendDataToParent={() => console.log('Submitted')}
                            questionPrompt="Tell us about your current subscriptions - we've provided some autofill buttons below:"
                            enableSuggestions={'subscriptions'}
                            enableConfirmation={true}
                        />
                    </div>
                : null}
            </div> : null }
        </div>
    )
}
