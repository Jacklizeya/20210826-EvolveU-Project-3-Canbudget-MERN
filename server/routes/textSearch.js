const express = require('express')
const router = express.Router()
const axios = require("axios")



async function textSearchRequest() {

    // Search Parameters
    let googleApiKey = 'AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY'
    let searchLat = 51.042642417966455
    let searchLng = -114.06990000957333
    let searchRadius = 10000 // Measured in m
    let searchAddress = '142+tuscany+ridge+close'
    let searchType = 'mortgage+broker'
    /// https://maps.googleapis.com/maps/api/place/textsearch/json?query=mortgage+broker&location=51.042642417966455,-114.06990000957333&radius=10000&key=AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY


    let textSearchCoordinatesURL = ('https://maps.googleapis.com/maps/api/place/textsearch/json?query='
        +searchType
        +'&location='+searchLat+','+searchLng
        +'&radius='+searchRadius
        +'&key='+googleApiKey)

    let textSearchAddressURL = ('https://maps.googleapis.com/maps/api/place/textsearch/json?query='
        +searchType+'+'+searchAddress
        +'&radius='+searchRadius
        +'&key='+googleApiKey)

    let res = await axios.get(textSearchCoordinatesURL)

    let data = res.data

    let searchData = []
    for (const index in data.results) {
      let result = data.results[index]
      if (result.business_status === 'OPERATIONAL') {
        let trimmedResult = {key: result.place_id, name: result.name, geometry: result.geometry, rating: result.rating, ratingCount: result.user_ratings_total, address: result.vicinity}
        searchData.push(trimmedResult)
      }
    }
    console.log(searchData)
    return searchData
  }

textSearchRequest()

router.get('/', async (req, res) => {
    try {
        let data = await textSearchRequest()
        res.send(data);
        console.log(data)
    } catch (error) {res.send(error)}
})

module.exports = router;