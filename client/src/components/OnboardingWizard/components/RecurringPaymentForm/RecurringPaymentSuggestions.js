import React, {useEffect, useState} from 'react'

import netflixIcon from './SuggestionIcons/netflix.png'
import spotifyIcon from './SuggestionIcons/spotify.png'
import disneyIcon from './SuggestionIcons/disney.jpeg'
import appleIcon from './SuggestionIcons/apple.jpeg'
import sportsnetIcon from './SuggestionIcons/sportsnet.jpeg'
import craveIcon from './SuggestionIcons/crave.png'
import tsnIcon from './SuggestionIcons/tsn.png'

export default function RecurringPaymentSuggestions({suggestionType, sendDataToParent}) {

  const suggestionArray = {
    subscriptions: [
      {name: 'Netflix', amount: 14.99, imgSource: netflixIcon},
      {name: 'Spotify', amount: 9.99, imgSource: spotifyIcon },
      {name: 'Disney+', amount: 11.99, imgSource: disneyIcon},
      {name: 'Apple TV+', amount: 5.99, imgSource: appleIcon},
      {name: 'Crave', amount: 9.99, imgSource: craveIcon},
      {name: 'SN Now', amount: 12.50, imgSource: sportsnetIcon},
      {name: 'TSN Direct', amount: 17.50, imgSource: tsnIcon}
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
          suggestion.imgSource ?
            <input 
              type="image"
              className='subscription-suggestion-button' 
              src={suggestion.imgSource} 
              name={suggestion.name}
              key={suggestion.name} 
              value={suggestion.amount}
              width="40px" 
              height="40px"
              alt={suggestion.name}
              onClick={(event) => {sendDataToParent({name: event.target.name, amount: event.target.value})}}
            >
            </input> :
          //   <button
          //     className='suggestion-icon-button'
          //     key={suggestion.name}
          //     name={suggestion.name}
          //     value={suggestion.amount}
          //     src={suggestion.imgSource}
          //     onClick={(event) => {sendDataToParent({name: event.target.name, amount: event.target.value})}}
          //   >
          //     <img 
          //       src={suggestion.imgSource} 
          //       alt={suggestion.name} 
          //       height={'40px'}
          //     ></img>
          //   </button> :
            <button 
              className='recurring-payment-button'
              key={suggestion.name}
              name={suggestion.name}
              value={suggestion.amount}
              src={suggestion.imgSource}
              onClick={(event) => {sendDataToParent({name: event.target.name, amount: event.target.value})}}
            >
              {suggestion.name}
            </button>
        )
      })}
    </div>
  )
}
