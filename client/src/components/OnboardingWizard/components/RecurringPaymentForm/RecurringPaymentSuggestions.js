import React, {useEffect, useState} from 'react'

export default function RecurringPaymentSuggestions({suggestionType, sendDataToParent}) {

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
      {name: 'Water', amount: 40.00},
      {name: 'Heat', amount: 100.00},
      {name: 'Electric', amount: 100.00},
      {name: 'Phone', amount: 80.00},
      {name: 'Internet', amount: 60.00},
      {name: 'TV', amount: 50.00},
    ]
  }

  const [selectedArray, setSelectedArray] = useState([])

  useEffect(() => {
    if (suggestionType === 'subscriptions') {
      setSelectedArray(suggestionArray.subscriptions)
    } else if (suggestionType === 'utilities') {
      setSelectedArray(suggestionArray.utilities)
    }
  }, [])


  return (
    <div className='recurring-suggestions-row'>
      {selectedArray.map((suggestion, i) => {
        return (
          <button 
            className='recurring-payment-button'
            key={suggestion.name}
            name={suggestion.name}
            value={suggestion.amount}
            onClick={(event) => {sendDataToParent({name: event.target.name, amount: event.target.value})}}
          >
            {suggestion.name}
          </button>
        )
      })}
    </div>
  )
}
