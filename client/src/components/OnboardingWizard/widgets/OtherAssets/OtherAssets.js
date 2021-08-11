import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function OtherAssets() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userHasOtherAssets, setUserHasOtherAssets] = useState(null)
    const [userAssetDetailsEntered, setUserAssetDetailsEntered] = useState(false)

    const handleDataFromUserHasOtherAssets = (data) => {
        data === 'true' ? setUserHasOtherAssets(true) : setUserHasOtherAssets(false)
    }

    const handleAssetDetailsSubmit = (event) => {
        setUserAssetDetailsEntered(true)
    }

    const handleHeaderClick = (event) => {
        setDisplayOnboardBody(!displayOnboardBody)
    }

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={handleHeaderClick}>Other Assets</h2>
            {displayOnboardBody ? <div>
                <BooleanRadioButtons sendDataToParent={handleDataFromUserHasOtherAssets} questionPrompt='Do you have any other large assets you would like to track?'/>
                {userHasOtherAssets === true ? 
                    <div>
                        <RecurringPaymentForm sendDataToParent={handleAssetDetailsSubmit} questionPrompt='Tell us about your assets:'/>
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
