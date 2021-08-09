import React, {useEffect, useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'
import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Transportation() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userOwnsVehicle, setUserOwnsVehicle] = useState(null)
    const [userHasVehiclePayments, setUserHasVehiclePayments] = useState(null)
    const [userVehicleDetailsEntered, setUserVehicleDetailsEntered] = useState(false)
    const [userHasInsurance, setUserHasInsurance] = useState(null)
    const [userInsuranceDetailsEntered, setUserInsuranceDetailsEntered] = useState(false)
    const [askTransportationCosts, setAskTransportationCosts] = useState(false)
    const [userHasTransportationCosts, setUserHasTransportationCosts] = useState(null)


    const handleDataFromUserOwnsVehicle = (data) => {
      if (data === 'true') {
        setUserOwnsVehicle(true)
      } else if (data === 'false') {
          setUserOwnsVehicle(false)
          setAskTransportationCosts(true)
      }
    }

    const handleDataFromUserHasVehiclePayments = (data) => {
      if (data === 'true') {
        setUserHasVehiclePayments(true)
      } else if (data === 'false') {
          setUserHasVehiclePayments(false)
          setAskTransportationCosts(true)
      }
    }

    const handleDataFromUserHasTransportationCosts = (data) => {
      if (data === 'true') {
        setUserHasTransportationCosts(true)
      } else if (data === 'false') {
          setUserHasTransportationCosts(false)
      }
    }

    const handleVehiclePaymentDetailsSubmit = (event) => {
        setUserVehicleDetailsEntered(true)
    }

    const handleDataFromUserHasInsurance = (data) => {
      if (data === 'true') {
        setUserHasInsurance(true)
      } else if (data === 'false') {
          setUserHasInsurance(false)
          setAskTransportationCosts(true)
      }
    }

    const handleInsuranceDetailsSubmit = (event) => {
        setUserInsuranceDetailsEntered(true)
        setAskTransportationCosts(true)
    }

    const handleHeaderClick = (event) => {
        setDisplayOnboardBody(!displayOnboardBody)
    }

    return (
      <div className='onboard-container'>
        <h2 className='onboard-heading' onClick={handleHeaderClick}>Transportation</h2>
        {displayOnboardBody ? <div>
          <p className='onboard-heading-body'>Everyone needs to get around somehow! Let's talk about your expenses related to transportation</p>
          <BooleanRadioButtons sendDataToParent={handleDataFromUserOwnsVehicle} questionPrompt='Do you own your own vehicle?:'/>
            {userOwnsVehicle === true ?
              <div> 
                <BooleanRadioButtons sendDataToParent={handleDataFromUserHasVehiclePayments} questionPrompt='Do you make payments on your vehicle?'/>
                {userHasVehiclePayments === true ? 
                  <RecurringPaymentForm
                    sendDataToParent={handleVehiclePaymentDetailsSubmit}
                    questionPrompt='Tell us about your vehicle payment:'
                    enableAddRows={false}
                  /> 
                : null}
                {userVehicleDetailsEntered ? 
                  <div>
                    <BooleanRadioButtons sendDataToParent={handleDataFromUserHasInsurance} questionPrompt='Do you have vehicle insurance?'/>
                    {userHasInsurance === true ? 
                      <RecurringPaymentForm
                        sendDataToParent={handleInsuranceDetailsSubmit}
                        questionPrompt='Tell us about your vehicle insurance'
                        enableAddRows={false}
                      />
                    : null}
                  </div>
                : null}
              </div>
            : null}
          {askTransportationCosts ? <BooleanRadioButtons sendDataToParent={handleDataFromUserHasTransportationCosts} questionPrompt='Do you have other costs related to transportation?'/> : null}
        </div> : null}
      </div>
    )
}
