const express = require('express')
const router = express.Router()
const axios = require("axios")



async function textSearchRequest(apiUrl) {

    // Search Parameters
    let googleApiKey = 'AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY'
    let searchLat = 51.042642417966455
    let searchLng = -114.06990000957333
    let searchRadius = 10000 // Measured in m
    let searchAddress = '142+tuscany+ridge+close'
    let searchType = 'mortgage+broker'
    /// https://maps.googleapis.com/maps/api/place/textsearch/json?query=mortgage+broker&location=51.042642417966455,-114.06990000957333&radius=10000&key=AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY

    let searchUrl = ('https://maps.googleapis.com/maps/api/place/textsearch/json?query='
      + apiUrl
      + '&key='+googleApiKey)

    console.log(searchUrl)

    let textSearchCoordinatesURL = ('https://maps.googleapis.com/maps/api/place/textsearch/json?query='
        +searchType
        +'&location='+searchLat+','+searchLng
        +'&radius='+searchRadius
        +'&key='+googleApiKey)

    let textSearchAddressURL = ('https://maps.googleapis.com/maps/api/place/textsearch/json?query='
        +searchType+'+'+searchAddress
        +'&radius='+searchRadius
        +'&key='+googleApiKey)

    let res = await axios.get(searchUrl)

    let data = res.data

    let searchData = []
    for (const index in data.results) {
      let result = data.results[index]
      if (result.business_status === 'OPERATIONAL') {
        let trimmedResult = {key: result.place_id, name: result.name, geometry: result.geometry, rating: result.rating, ratingCount: result.user_ratings_total, address: result.formatted_address}
        searchData.push(trimmedResult)
      }
    }
    return searchData
  }

textSearchRequest()

router.get('/:apiUrl', async (req, res) => {
    try {
        console.log(req.params.apiUrl)
        let data = await textSearchRequest(req.params.apiUrl)
        res.send(data);
    } catch (error) {res.send(error)}
})

module.exports = router;