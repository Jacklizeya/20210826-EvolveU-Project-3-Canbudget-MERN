const settingDB = require("../models/settings");
let settings =  settingDB.getSetting().then((c) => {
    return c;});

// let settings =  await settingDB.getSetting();
  
    
    
 async function tt()
 {
   return settings.then(t => {return t;});
 }   

 function pp(name)
 {
   return settings.then(t => {return t[name];});
 }   


// export default await settingDB;

module.exports = {
  settings,
  tt, pp
}        
