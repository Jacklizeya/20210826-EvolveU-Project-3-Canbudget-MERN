import React, {useState} from 'react'

export default function Shelter() {

    const [ownHome, setOwnHome] = useState(null)

    const handleOwnHomeButtons = (event) => {
        event.target.value === 'true' ? setOwnHome(true) : setOwnHome(false)
    }

    return (
        <div className='onboard-container'>
            <h3 className='onboard-heading'>Let's start by answering a few questions about your home.</h3>
            <form action="/action_page.php">
                <p>Do you own your own home?</p>
                  <input type="radio" id="ownHomeTrue" name="ownHome" value='true' onClick={handleOwnHomeButtons}></input>
                  <label for="ownHomeTrue">Yes</label><br></br>
                  <input type="radio" id="ownHomeFalse" name="ownHome" value='false' onClick={handleOwnHomeButtons}></input>
                  <label for="ownHomeFalse">No</label><br></br>
            </form>
            {ownHome !== null ? (ownHome === true ? <p>Tell us about your mortgage payment:</p> : <p>Tell us about your rental situation - if you don't pay rent enter $0</p>) : null}
        </div>
    )
}
