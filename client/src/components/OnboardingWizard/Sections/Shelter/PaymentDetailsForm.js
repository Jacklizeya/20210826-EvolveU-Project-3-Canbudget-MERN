import React from 'react'

export default function PaymentDetailsForm({userOwnsHome}) {

  return (
    <form>
      {userOwnsHome === true ? 
          <p>Tell us about your mortgage payment:</p> : 
          <p>Tell us about your rental situation - if you don't pay rent enter $0:</p>
      }
      <input type='number' placeholder='$ Amount'></input>
      <input type='number' placeholder='Frequency'></input>
      <input type='text' placeholder='Frequency Type'></input>
      <input type='date' placeholder='Bill Date'></input>
      <input type='date' placeholder='Contract End Date'></input>
    </form> 
  )
}
