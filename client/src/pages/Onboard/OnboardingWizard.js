import React, {useContext} from 'react'
import AuthenticationContext from '../../components/auth/AuthenticationContext';

import Shelter from '../../components/OnboardingWizard/widgets/Shelter/Shelter'
import Subscriptions from '../../components/OnboardingWizard/widgets/Subscriptions/Subscriptions'
import Transportation from '../../components/OnboardingWizard/widgets/Transportation/Transportation'
import Utilities from '../../components/OnboardingWizard/widgets/Utilities/Utilities'
import CreditCardBills from '../../components/OnboardingWizard/widgets/CreditCardBills/CreditCardBills'
import OtherAssets from '../../components/OnboardingWizard/widgets/OtherAssets/OtherAssets'

import './OnboardingWizard.css'

export default function OnboardingWizard() {

    const {id} = useContext(AuthenticationContext)

    return (
        <div className='onboard-body'>
            <div className='onboard-container'>
                <h1 className='onboard-heading'>Welcome to CanBudget!</h1>
                <p className='onboard-heading-body'>We are here to help you start planning your financial future.</p>
                {/* Put buttons here */}
            </div>
            <Shelter />
            <Transportation />
            <Subscriptions />
            <Utilities />
            <CreditCardBills />
            <OtherAssets />
        </div>
    )
}
