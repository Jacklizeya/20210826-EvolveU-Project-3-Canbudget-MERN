const express = require('express')
const router = express.Router()
const axios = require("axios")

async function textSearchRequest(apiUrl) {

    let searchUrl = ('https://maps.googleapis.com/maps/api/place/textsearch/json?query='
      + apiUrl
      + '&key='+process.env.GOOGLE_MAPS_API_KEY)

    let res = await axios.get(searchUrl)

    let data = res.data

    let searchData = []
    for (const index in data.results) {
      let result = data.results[index]
      if (result.business_status === 'OPERATIONAL') {
        let trimmedResult = {
          key: result.place_id, 
          name: result.name, 
          geometry: result.geometry, 
          rating: result.rating, 
          ratingCount: result.user_ratings_total, 
          address: result.formatted_address.split(',')[0], // Slicing to retrieve street address
          city:  result.formatted_address.split(',')[1]+' '+result.formatted_address.split(',')[2]// Slicing to retrieve city + province
        }
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