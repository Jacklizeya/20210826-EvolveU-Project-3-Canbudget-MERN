import React from 'react'

import './OnboardingWizard.css'

import Shelter from './widgets/Shelter/Shelter'
import Subscriptions from './widgets/Subscriptions/Subscriptions'
import Transportation from './widgets/Transportation/Transportation'
import Utilities from './widgets/Utilities/Utilities'
import CreditCardBills from './widgets/CreditCardBills/CreditCardBills'
import OtherAssets from './widgets/OtherAssets/OtherAssets'


export default function OnboardingWizard() {
    return (
        <div className='onboard-body'>
            <div className='onboard-container'>
                <h1 className='onboard-heading'>Welcome to CanBudget!</h1>
                <p className='onboard-heading-body'>We are here to help you start planning your financial future.</p>
            </div>
            {/* Put buttons here */}
            <Shelter />
            <Transportation />
            <Subscriptions />
            <Utilities />
            <CreditCardBills />
            <OtherAssets />
        </div>
    )
}
