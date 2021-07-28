import React from 'react'

export default function BooleanRadioButtons({sendDataToParent, questionPrompt}) {

  const handleClick = (event) => {
    sendDataToParent(event.target.value)
  }

  return (
    <form>
      <p>{questionPrompt}</p>
      <input type="radio" id="yesOnboardRadio" name="booleanOnboardRadio" value='true' onClick={handleClick}></input>
      <label for="yesOnboardRadio">Yes</label><br></br>
      <input type="radio" id="noOnboardRadio" name="booleanOnboardRadio" value='false' onClick={handleClick}></input>
      <label for="noOnboardRadio">No</label><br></br>
    </form>
  )
}
