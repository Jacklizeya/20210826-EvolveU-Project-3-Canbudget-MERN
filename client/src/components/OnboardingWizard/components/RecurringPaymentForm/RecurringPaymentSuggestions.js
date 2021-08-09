import React, {useEffect, useState} from 'react'

export default function RecurringPaymentSuggestions() {

  const suggestionArray = [
    {name: 'Netflix', amount: 14.99},
    {name: 'Spotify', amount: 9.99},
    {name: 'Disney+', amount: 11.99},
    {name: 'Apple TV+', amount: 5.99},
    {name: 'Crave', amount: 9.99},
    {name: 'SN Now', amount: 12.50},
    {name: 'TSN Direct', amount: 17.50}
  ]

  const [selected, setSelected] = useState(null)

  useEffect(() => {
    console.log(selected)
  },[selected])

  return (
    <div className='recurring-suggestions-row'>
      {suggestionArray.map((suggestion, i) => {
        console.log(suggestion)
        return (
          <button 
            className='recurring-suggestions-button'
            key={suggestion.name}
            name={suggestion.name}
            value={suggestion.amount}
            onClick={(event) => {setSelected({name: event.target.name, amount: event.target.value})}}
          >
            {suggestion.name}
          </button>
        )
      })}
    </div>
  )
}
