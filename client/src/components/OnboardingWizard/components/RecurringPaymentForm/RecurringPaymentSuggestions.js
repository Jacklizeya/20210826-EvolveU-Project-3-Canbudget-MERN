import React, {useEffect, useState} from 'react'

export default function RecurringPaymentSuggestions({suggestionType}) {

  const suggestionArray = {
    subscriptions: [
      {name: 'Netflix', amount: 14.99},
      {name: 'Spotify', amount: 9.99},
      {name: 'Disney+', amount: 11.99},
      {name: 'Apple TV+', amount: 5.99},
      {name: 'Crave', amount: 9.99},
      {name: 'SN Now', amount: 12.50},
      {name: 'TSN Direct', amount: 17.50}
    ],
    utilities: [
      {name: 'Water', amount: 14.99},
      {name: 'Heat', amount: 9.99},
      {name: 'Electric', amount: 11.99},
      {name: 'Phone', amount: 5.99},
      {name: 'Internet', amount: 9.99},
      {name: 'TV', amount: 12.50},
    ]
  }

  const [selectedArray, setSelectedArray] = useState([])
  const [clicked, setClicked] = useState(null)

  useEffect(() => {
    console.log(suggestionType)
    if (suggestionType === 'subscriptions') {
      setSelectedArray(suggestionArray.subscriptions)
    } else if (suggestionType === 'utilities') {
      setSelectedArray(suggestionArray.utilities)
    }
  }, [])

  useEffect(() => {
    console.log(clicked)
  },[clicked])

  return (
    <div className='recurring-suggestions-row'>
      {selectedArray.map((suggestion, i) => {
        console.log(suggestion)
        return (
          <button 
            className='recurring-payment-button'
            key={suggestion.name}
            name={suggestion.name}
            value={suggestion.amount}
            onClick={(event) => {setClicked({name: event.target.name, amount: event.target.value})}}
          >
            {suggestion.name}
          </button>
        )
      })}
    </div>
  )
}
