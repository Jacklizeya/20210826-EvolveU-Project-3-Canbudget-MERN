import React, {useState} from 'react'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'
import RecurringPaymentDetailsForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

export default function Utilities() {

  const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
  const [userHasUtilities, setuserHasUtilities] = useState(null)

  const handleDataFromUserHasUtilites = (data) => {
    if (data === 'true') {
      setuserHasUtilities(true)
    } else if (data === 'false') {
      setuserHasUtilities(false)
    }
  }

  const handleHeaderClick = (event) => {
      setDisplayOnboardBody(!displayOnboardBody)
  }

  return (
    <div className='onboard-container'>
      <h2 className='onboard-heading' onClick={handleHeaderClick}>Utilties</h2>
      {displayOnboardBody ? <div>
        <p className='onboard-heading-body'>Keeping the lights on isn't free! Let's talk about your utilitiy bills</p>
        <BooleanRadioButtons sendDataToParent={handleDataFromUserHasUtilites} questionPrompt='Do you have recurring utility bills?:'/>
        {userHasUtilities ? 
          <RecurringPaymentDetailsForm
            // sendDataToParent={handleVehiclePaymentDetailsSubmit}
            questionPrompt='Tell us about your utility bills:'
          /> 
        : null}
      </div> : null}
    </div>
  )
}
