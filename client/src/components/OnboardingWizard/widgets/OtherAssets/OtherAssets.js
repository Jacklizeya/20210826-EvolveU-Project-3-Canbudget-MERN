import React, {useState} from 'react'

import RecurringPaymentForm from '../../components/RecurringPaymentForm/RecurringPaymentForm'

import BooleanRadioButtons from '../../components/BooleanRadiusButtons/BooleanRadioButtons'

export default function OtherAssets() {

    const [displayOnboardBody, setDisplayOnboardBody] = useState(false)
    const [userHasOtherAssets, setUserHasOtherAssets] = useState(null)
    const [userAssetDetailsEntered, setUserAssetDetailsEntered] = useState(false)

    return (
        <div className='onboard-container'>
            <h2 className='onboard-heading widget' onClick={() => setDisplayOnboardBody(!displayOnboardBody)}>Other Assets</h2>
            {displayOnboardBody ? <div>
                <BooleanRadioButtons
                    questionPrompt='Do you have any other large assets you would like to track?'
                    sendDataToParent={(data) => {
                        data === 'true' ? setUserHasOtherAssets(true) : setUserHasOtherAssets(false)
                    }} 
                />
                {userHasOtherAssets === true ? 
                    <div>
                        <RecurringPaymentForm 
                            questionPrompt='Tell us about your assets:'
                            enableAssetsOnly={true}
                            enableConfirmation={true}
                            sendDataToParent={() => setUserAssetDetailsEntered(true)} 
                        />
                    </div>
                : null}
            </div> : null}
        </div>
    )
}
