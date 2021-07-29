import React from 'react'

import './BooleanRadioButtons.css'

export default function BooleanRadioButtons({sendDataToParent, questionPrompt}) {

  const handleClick = (event) => {
    sendDataToParent(event.target.value)
  }

  return (
    <form className='onboard-boolean-radio-form'>
      {typeof questionPrompt === 'string' ? <p className='onboard-boolean-prompt'>{questionPrompt}</p> : questionPrompt}
      <div>
        <input type="radio" id="yesOnboardRadio" name="booleanOnboardRadio" value='true' onClick={handleClick}></input>
        <label for="yesOnboardRadio">Yes</label>
      </div>
      <div>
        <input type="radio" id="noOnboardRadio" name="booleanOnboardRadio" value='false' onClick={handleClick}></input>
        <label for="noOnboardRadio">No</label>
      </div>
    </form>
  )
}
