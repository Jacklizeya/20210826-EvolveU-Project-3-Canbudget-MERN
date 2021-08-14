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
                <BooleanRadioButtons
                    questionPrompt='Do you have any other large assets you would like to track?'
                    sendDataToParent={handleDataFromUserHasOtherAssets} 
                />
                {userHasOtherAssets === true ? 
                    <div>
                        <RecurringPaymentForm 
                            questionPrompt='Tell us about your assets:'
                            enableAssetsOnly={true}
                            sendDataToParent={handleAssetDetailsSubmit} 
                        />
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
