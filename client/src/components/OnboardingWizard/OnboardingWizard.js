import React from 'react'

import Shelter from './sections/Shelter/Shelter'
import Subscriptions from './sections/Subsriptions/Subscriptions'

import './OnboardingWizard.css'
import Transportation from './sections/Transportation/Transportation'

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
        </div>
    )
}
