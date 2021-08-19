const express = require('express')
const router = express.Router()
const axios = require("axios")



async function nearbySearchRequest() {

    // Search Parameters
    let googleApiKey = process.env.GOOGLE_API_KEY
    let searchLat = 51.042642417966455
    let searchLng = -114.06990000957333
    let searchRadius = 10000 // Measured in m
    let searchType = 'bank'


    let nearbySearchURL = ('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
      +'key='+googleApiKey
      +'&location='+searchLat+','+searchLng
      +'&radius='+searchRadius
      +'&type='+searchType)

    let res = await axios.get(nearbySearchURL)

    let data = res.data

    let searchData = []
    for (const index in data.results) {
      let result = data.results[index]
      if (result.business_status === 'OPERATIONAL') {
        let trimmedResult = {key: result.place_id, name: result.name, geometry: result.geometry, rating: result.rating, ratingCount: result.user_ratings_total, address: result.vicinity}
        searchData.push(trimmedResult)
      }
    }
    return searchData
  }

nearbySearchRequest()

router.get('/', async (req, res) => {
    try {
        let data = await nearbySearchRequest()
        res.send(data);
    } catch (error) {res.send(error)}
})

module.exports = router;