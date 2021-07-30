// Return Alpha vantage apikey 
const serverSetting  = require('../models/loadServerSetting');

async function  getAlphaKey(isInterval) {
    let s = await serverSetting.setting;
    let interval = s.interval;
    let key = s.key;
    
    //return '3PRM4UE4KPUFCKVB';
    return isInterval ? `&interval=${interval}&apikey=` +key :
    '&apikey=' +key;
}

module.exports = {
    getAlphaKey
}