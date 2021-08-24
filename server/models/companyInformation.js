const mongoose = require('mongoose');
const fetch = require('node-fetch');

const alphaKey  = require("./alphaKey")
require('./db')

const Schema = mongoose.Schema;

const companyInformationSchema = new Schema({
  Symbol: {
    type: String,
    required: true,
    index:{ unique: false}
  },
    Name: String,
    Description: String,
    Exchange: String,
    Currency: String,
    Country: String,
    Sector: String, 
    Industry: String,
    PERatio: Number,
    MarketCapitalization: Number
});

const companyInformationModel = mongoose.model('Company', companyInformationSchema, 'companies');

async function getCompanyInformation(symbol) {
    let company = null;
    try {
        company = await companyInformationModel.findOne({ Symbol:symbol})       
    } catch (error) {
        console.error("err=", err)
    }
       
    if (company) {
         //console.log("from db");
         return  company;
    }
    company = await getCompanyInformationAlpha(symbol);
    if (company){
        if(isNaN(company.FullTimeEmployees)){
            company.FullTimeEmployees =0;
        }
        if(isNaN(company.MarketCapitalization)){
            company.MarketCapitalization =0;
        }
        if(isNaN(company.PERatio)){
            company.PERatio =0;
        }
    }
    //  console.log(company);

    if (company && company.Symbol!=null && company.Name != null ){
        // console.log("Save companyload from alpha");
        // console.log(company);
        await saveCompanyInformation(company);
    }
    return company;
}

async function saveCompanyInformation(company) {
    return  companyInformationModel.create(company);
  }

async function getCompanyInformationAlpha(symbol){
    let url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol + await alphaKey.getAlphaKey();
    // console.log(url)
    try {
        let responce = await fetch(url);
        if ( responce.ok){
            const c = await responce.json();
            const  { Symbol,Name, Description,Exchange, Currency, Country, Sector, Industry, PERatio, MarketCapitalization} = c;
            return { Symbol,Name, Description,Exchange, Currency, Country, Sector, Industry, PERatio, MarketCapitalization} ;
        }               
    } catch (error) {
        console.error(error);
    }
    return {};
}


module.exports = {
    getCompanyInformation
}