import React, {useEffect, useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'
import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Transportation() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userOwnsVehicle, setUserOwnsVehicle] = useState(null)
    const [userHasVehiclePayments, setUserHasVehiclePayments] = useState(null)
    const [vehiclePaymentDetails, setVehiclePaymentDetails] = useState(null)
    const [userHasInsurance, setUserHasInsurance] = useState(null)
    const [insurancePaymentDetails, setInsurancePaymentDetails] = useState(null)
    const [userHasTransportationCosts, setUserHasTransportationCosts] = useState(null)
    const [transportationPaymentDetails, setTransportationPaymentDetails] = useState(null)

    return (
      <div className='onboard-container'>
        <h2 className='onboard-heading widget' onClick={() => setDisplayOnboardBody(!displayOnboardBody)}>Transportation</h2>
        {displayOnboardBody ? <div>
          <p className='onboard-heading-body'>Everyone needs to get around somehow! Let's talk about your expenses related to transportation</p>
          <BooleanRadioButtons
            questionPrompt='Do you own your own vehicle?:'
            sendDataToParent={(data) => {
              if (data === 'true') {
                setUserOwnsVehicle(true)
              } else if (data === 'false') {
                setUserOwnsVehicle(false)
              }
            }}
          />
          {userOwnsVehicle === true ?
            <div> 
              <BooleanRadioButtons
                questionPrompt='Do you make payments on your vehicle?' 
                sendDataToParent={(data) => {
                  if (data === 'true') {
                    setUserHasVehiclePayments(true)
                  } else if (data === 'false') {
                    setUserHasVehiclePayments(false)
                  }
                }} 
              />
              {userHasVehiclePayments ? 
                <RecurringPaymentForm
                  questionPrompt='Tell us about your vehicle payment:'
                  paymentName='Vehicle Payment' 
                  enableAddRows={false}
                  sendDataToParent={(data) => {
                    setVehiclePaymentDetails(data[0])
                  }}
                /> 
              : null}
              {vehiclePaymentDetails ? 
                <div>
                  <BooleanRadioButtons
                    questionPrompt='Do you have vehicle insurance?'
                    sendDataToParent={(data) => {
                      if (data === 'true') {
                        setUserHasInsurance(true)
                      } else if (data === 'false') {
                        setUserHasInsurance(false)
                      }
                    }}
                  />
                  {userHasInsurance === true ? 
                    <RecurringPaymentForm
                      questionPrompt='Tell us about your vehicle insurance:'
                      paymentName='Vehicle Insurance'
                      enableAddRows={false}
                      sendDataToParent={(data) => {
                        setInsurancePaymentDetails(data[0])
                      }}
                    />
                  : null}
                </div>
              : null}
            </div>
          : null}
          {(userOwnsVehicle === false || userHasVehiclePayments === false|| userHasInsurance === false || insurancePaymentDetails) ? 
            <BooleanRadioButtons
              questionPrompt='Do you have other costs related to transportation?' 
              sendDataToParent={(data) => {
                if (data === 'true') {
                  setUserHasTransportationCosts(true)
                } else if (data === 'false') {
                  setUserHasTransportationCosts(false)
                }
              }}
            />
          : null}
          {userHasTransportationCosts ?
            <RecurringPaymentForm
              questionPrompt='Tell use about your transportation costs (common expenses include transit passes or Uber costs)'
              enableAddRows={true}
              sendDataToParent={(data) => {
                setTransportationPaymentDetails(data)
              }}
            />
          : null}
        </div> : null}
      </div>
    )
}
