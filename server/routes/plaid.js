var express = require('express');
var router = express.Router();

const util = require('util');
const plaid = require('plaid');

const plaidClient = new plaid.Client({
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    env: plaid.environments.sandbox,
});

router.get('/', async (req, res) => {
    res.send("Hello Plaid is ready");
});

router.get('/create-link-token', async (req, res) => {
    const { link_token: linkToken } = await plaidClient.createLinkToken({
        user: {
            client_user_id: 'some-unique-identifier',
        },
        client_name: 'CanBudget',
        products: ['auth', 'identity'],
        country_codes: ['CA'],
        language: 'en',
    });
    res.json({ linkToken });
});

router.post('/token-exchange', async (req, res) => {
    console.log("want to exchange token")
    // this will be from the client side frontend
    const { public_token } = req.body;  
    // use public token to get accessToken
    const { access_token: accessToken } = await plaidClient.exchangePublicToken(public_token);
    console.log(accessToken);

    // const authResponse = await plaidClient.getAuth(accessToken);
    // console.log('Auth response:');
    // console.log(util.inspect(authResponse, false, null, true));
    // console.log('---------------');
    // // I probably do not need identity response
    // const identityResponse = await plaidClient.getIdentity(accessToken);
    // console.log('Identity response:');
    // console.log(util.inspect(identityResponse, false, null, true));
    // console.log('---------------');
    // // this is the main part I need, the balanceResponse data
    const balanceResponse = await plaidClient.getBalance(accessToken);
    console.log('Balance response');
    console.log(util.inspect(balanceResponse, false, null, true));
    console.log('---------------');
    console.log("************************", balanceResponse)
   
    res.status(200).json(balanceResponse);
});

module.exports = router