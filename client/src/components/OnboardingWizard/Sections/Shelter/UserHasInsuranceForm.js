import React from 'react'

export default function UserHasInsuranceForm({setUserHasInsurance}) {

  const handleHasInsuranceButtons = (event) => {
    setUserHasInsurance(event.target.value)
  }

  return (
    <form>
      <p>Do you have home insurance?</p>
      <input type="radio" id="userHasInsuranceTrue" name="userHasInsurance" value='true' onClick={handleHasInsuranceButtons}></input>
      <label for="userHasInsuranceTrue">Yes</label><br></br>
      <input type="radio" id="userHasInsuranceFalse" name="userHasInsurance" value='false' onClick={handleHasInsuranceButtons}></input>
      <label for="userHasInsuranceFalse">No</label><br></br>
    </form>
  )
}
