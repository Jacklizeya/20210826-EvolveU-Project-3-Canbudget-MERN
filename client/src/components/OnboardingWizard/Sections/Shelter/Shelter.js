import React, {useState} from 'react'

import UserOwnsHomeForm from './UserOwnsHomeForm'
import ShelterPaymentForm from './ShelterPaymentForm'

export default function Shelter() {

    const [userOwnsHome, setUserOwnsHome] = useState(null)

    const handleDataFromUserOwnsHome = (data) => {
        data === 'true' ? setUserOwnsHome(true) : setUserOwnsHome(false)
    }

    return (
        <div className='onboard-container'>
            <h3 className='onboard-heading'>Let's start by answering a few questions about your home.</h3>
            <UserOwnsHomeForm setUserOwnsHome={handleDataFromUserOwnsHome}/>
            {userOwnsHome !== null ? <ShelterPaymentForm userOwnsHome={userOwnsHome}/> : null}
        </div>
    )
}
