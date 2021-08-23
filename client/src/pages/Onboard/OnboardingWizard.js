import React from 'react'

import './OnboardingWizard.css'

import Shelter from '../../components/OnboardingWizard/widgets/Shelter/Shelter'
import Subscriptions from '../../components/OnboardingWizard/widgets/Subscriptions/Subscriptions'
import Transportation from '../../components/OnboardingWizard/widgets/Transportation/Transportation'
import Utilities from '../../components/OnboardingWizard/widgets/Utilities/Utilities'
import CreditCardBills from '../../components/OnboardingWizard/widgets/CreditCardBills/CreditCardBills'
import OtherAssets from '../../components/OnboardingWizard/widgets/OtherAssets/OtherAssets'


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
