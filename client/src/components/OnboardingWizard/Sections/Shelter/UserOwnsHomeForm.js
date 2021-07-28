import React from 'react'

export default function UserOwnsHomeForm({setUserOwnsHome}) {

  const handleOwnHomeButtons = (event) => {
    setUserOwnsHome(event.target.value)
  }

  return (
    <form>
      <p>Do you own your own home?</p>
      <input type="radio" id="userOwnsHomeTrue" name="userOwnsHome" value='true' onClick={handleOwnHomeButtons}></input>
      <label for="userOwnsHomeTrue">Yes</label><br></br>
      <input type="radio" id="userOwnsHomeFalse" name="userOwnsHome" value='false' onClick={handleOwnHomeButtons}></input>
      <label for="userOwnsHomeFalse">No</label><br></br>
    </form>
  )
}
