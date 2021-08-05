import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function OtherAssets() {

    const [userHasOtherAssets, setUserHasOtherAssets] = useState(null)
    const [userAssetDetailsEntered, setUserAssetDetailsEntered] = useState(false)

    const handleDataFromUserHasOtherAssets = (data) => {
        data === 'true' ? setUserHasOtherAssets(true) : setUserHasOtherAssets(false)
    }

    const handleAssetDetailsSubmit = (event) => {
        setUserAssetDetailsEntered(true)
    }

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading'>Let's set some reminders for your credit card bills</h2>
            <BooleanRadioButtons sendDataToParent={handleDataFromUserHasOtherAssets} questionPrompt='Do you have any other large assets you would like to track?'/>
            {userHasOtherAssets === true ? 
                <div>
                    <RecurringPaymentForm sendDataToParent={handleAssetDetailsSubmit} questionPrompt='Tell us about your assets:'/>
                </div>
            : null}
        </div>
    )
}
