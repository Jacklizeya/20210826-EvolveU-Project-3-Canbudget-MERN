import React from 'react'

import './OnboardingWizard.css'

import Shelter from './sections/Shelter/Shelter'
import Subscriptions from './sections/Subscriptions/Subscriptions'
import Transportation from './sections/Transportation/Transportation'
import Utilities from './sections/Utilities/Utilities'
import CreditCardBills from './sections/CreditCardBills/CreditCardBills'


export default function OnboardingWizard() {
    return (
        <div className='onboard-body'>
            <div className='onboard-container'>
                <h1 className='onboard-heading'>Welcome to CanBudget!</h1>
                <p className='onboard-heading-body'>We are here to help you start planning your financial future.</p>
            </div>
            <Shelter />
            <Transportation />
            <Subscriptions />
            <Utilities />
            <CreditCardBills />
        </div>
    )
}
