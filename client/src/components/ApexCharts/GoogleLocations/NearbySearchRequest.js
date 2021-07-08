const axios = require('axios');

let url = ('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
  +'key=AIzaSyCPw4VRivOAyVV9WZGpwal6eRZJSIZh1KY'
  +'&location=51.042642417966455, -114.06990000957333'
  +'&radius=10000' // Measured in m
  +'&type=bank')

  async function makeGetRequest() {

    let res = await axios.get(url);
  
    let data = res.data;
    console.log(data);
  }
  
  makeGetRequest();

