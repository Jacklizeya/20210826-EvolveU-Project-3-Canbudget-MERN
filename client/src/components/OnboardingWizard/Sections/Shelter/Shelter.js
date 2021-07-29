import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function Shelter() {

    const [userOwnsHome, setUserOwnsHome] = useState(null)
    const [userRentDetailsEntered, setUserRentDetailsEntered] = useState(false)
    const [userHasInsurance, setUserHasInsurance] = useState(null)

    const handleDataFromUserOwnsHome = (data) => {
        data === 'true' ? setUserOwnsHome(true) : setUserOwnsHome(false)
    }

    const handleRentDetailsSubmit = (event) => {
        setUserRentDetailsEntered(true)
    }

    const handleDataFromUserHasInsurance = (data) => {
        data === 'true' ? setUserHasInsurance(true) : setUserHasInsurance(false)
    }

    const handleInsuranceDetailsSubmit = (event) => {
        setUserRentDetailsEntered(true)
    }

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading'>Let's start by answering a few questions about your monthly shelter expenses</h2>
            <BooleanRadioButtons sendDataToParent={handleDataFromUserOwnsHome} questionPrompt='Do you own your own home?:'/>
            {userOwnsHome !== null ? 
                <div>
                    <RecurringPaymentForm
                        sendDataToParent={handleRentDetailsSubmit} 
                        questionPrompt={ userOwnsHome === true ? 
                            'Tell us about your mortgage payment:' : 
                            "Tell us about your rental situation - if you don't pay rent enter $0:"
                        }
                    />
                </div>
            : null}
            {userRentDetailsEntered ?
                <div> 
                    <BooleanRadioButtons 
                        sendDataToParent={handleDataFromUserHasInsurance} 
                        questionPrompt='Do you have home insurance?'
                    />
                    {userHasInsurance ? 
                        <RecurringPaymentForm
                            sendDataToParent={handleInsuranceDetailsSubmit}
                            questionPrompt='Tell us about your home insurance payment:'
                        /> 
                        : userHasInsurance !== null ? <button>Click here to move on</button>: null
                    }
                </div> 
                : null}
        </div>
    )
}
