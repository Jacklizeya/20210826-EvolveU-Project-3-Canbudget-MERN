const axios = require('axios');

// Search parameters
let googleApiKey = 'AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY'
let searchLat = 51.042642417966455
let searchLng = -114.06990000957333
let searchRadius = 10000 // Measured in m
let searchType = 'bank'


let url = ('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  +'key='+googleApiKey
  +'&location='+searchLat+','+searchLng
  +'&radius='+searchRadius
  +'&type='+searchType)

async function nearbySearchRequest() {

  let res = await axios.get(url)

  let data = res.data

  let searchData = []
  for (const index in data.results) {
    let result = data.results[index]
    if (result.business_status === 'OPERATIONAL') {
      let trimmedResult = {name: result.name, geometry: result.geometry, rating: result.rating, ratingCount: result.user_ratings_total, address: result.vicinity}
      searchData.push(trimmedResult)
    }
  }
  return searchData
}
  
  nearbySearchRequest()

