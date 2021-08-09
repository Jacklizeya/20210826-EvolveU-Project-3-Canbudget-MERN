import React, {useState} from 'react'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'
import RecurringPaymentDetailsForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

export default function Utilities() {

  const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
  const [userHasUtilities, setuserHasUtilities] = useState(null)

  return (
    <div className='onboard-container'>
      <h2 
        className='onboard-heading' 
        onClick={() => {setDisplayOnboardBody(!displayOnboardBody)}}
      >
        Utilties
      </h2>
      {displayOnboardBody ? <div>
        <p className='onboard-heading-body'>Keeping the lights on isn't free! Let's talk about your utilitiy bills</p>
        <BooleanRadioButtons 
          questionPrompt='Do you have recurring utility bills?:'
          sendDataToParent={(data) => {
            if (data === 'true') {
              setuserHasUtilities(true)
            } else if (data === 'false') {
              setuserHasUtilities(false)
            }
          }}
        />
        {userHasUtilities ? 
          <RecurringPaymentDetailsForm
            // sendDataToParent={handleVehiclePaymentDetailsSubmit}
            questionPrompt='Tell us about your utility bills:'
            enableSuggestions={'utilities'}
          /> 
        : null}
      </div> : null}
    </div>
  )
}
