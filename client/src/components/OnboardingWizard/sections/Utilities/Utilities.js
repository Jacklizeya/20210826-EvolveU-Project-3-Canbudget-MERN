import React, {useState} from 'react'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'
import RecurringPaymentDetailsForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

export default function Utilities() {

  const [userHasUtilities, setuserHasUtilities] = useState(null)

  const handleDataFromUserHasUtilites = (data) => {
    if (data === 'true') {
      setuserHasUtilities(true)
    } else if (data === 'false') {
      setuserHasUtilities(false)
    }
  }
  return (
    <div className='onboard-container'>
      <h2 className='onboard-heading'>Keeping the lights on isn't free! Let's talk about your utilitiy bills</h2>
      <BooleanRadioButtons sendDataToParent={handleDataFromUserHasUtilites} questionPrompt='Do you have recurring utility bills?:'/>
      {userHasUtilities ? 
        <RecurringPaymentDetailsForm
          // sendDataToParent={handleVehiclePaymentDetailsSubmit}
          questionPrompt='Tell us about your utility bills:'
        /> 
      : null}
    </div>
  )
}
