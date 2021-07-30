require("./appSmall")
const companyInfo = require('../models/companyInformation');
console.log("Start")

companyInfo.getCompanyInformation("AMD").then(company => console.log("Company=", company)); 


console.log("End")