const companyDB = require('../models/companyInformation');
const usersMap = require('./usersMapManipulations');

async function getOneCompanyInformation(symbol) {
    const company = await companyDB.getCompanyInformation(symbol)
    let companyElement = createCompanyObj(company);
    return [companyElement];
}

function createCompanyObj(companyElement) {
    if (companyElement && companyElement.Symbol && companyElement.Name) {
        return companyElement;
    } else {
        companyElement.Name = "Can't get company information from the exchange";
        companyElement.Sector = "";
        companyElement.Industry = "";
    }
    return companyElement;
}

async function getAllCompaniesInformation(user) {
    const compSet = usersMap.getCompaniesSet(user);

    let compArrayProm = [];
    let companies = [];
    let c;
    for (let symbol of compSet) {
        c = companyDB.getCompanyInformation(symbol);
        compArrayProm.push(c);

    }
    if (compArrayProm.length > 0) {
        let values = await Promise.all(compArrayProm)
        for (let val of values) {
            company = createCompanyObj(val);
            companies.push(company);
        }
    }
    return companies;
}

module.exports = {
    getOneCompanyInformation,
    getAllCompaniesInformation
}