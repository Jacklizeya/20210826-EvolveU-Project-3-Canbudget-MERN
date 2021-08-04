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

// This router is to get the event reply from Plaid
router.post("/", async (req, res) => {
    // console.log("something from plaid is here");
    console.log(req.io)
    io = req.io
    // console.log(req.body["webhook_code"])
    plaidReply = req.body["webhook_code"]
    // console.log("plaidReply", plaidReply)  
    io.emit("message", plaidReply)  
    // console.log(" I just emit some message")
})
// Currently webhook only available for 2 hours and it is changing all the time
router.get('/create-link-token', async (req, res) => {
    const { link_token: linkToken } = await plaidClient.createLinkToken({
        user: {
            client_user_id: 'some-unique-identifier',
        },
        client_name: 'CanBudget',
        products: ['auth', 'identity'],
        country_codes: ['CA'],
        language: 'en',
        webhook: process.env.NGROK + "/api/plaid"
    });
    res.json({ linkToken });
});

router.get('/categories', async (req,res) => {
    const response = await plaidClient.getCategories().catch((err) => {
        console.log('Error getting categories')
    })
    let categories = []
    for (let i in response.categories) {
        categories.push(response.categories[i].hierarchy)
    }
    let firstNode = []
    for (let i in categories) {
        firstNode.push(categories[i][0])
    }
    firstNode = [...new Set(firstNode)]
    for (let i in firstNode) {
        let selectedNode = firstNode[i]
        let childrenArray = []
        for (let j in categories) {
            if((selectedNode === categories[j][0]) && categories[j][1]) {
                childrenArray.push(categories[j][1])
            }
        }
        childrenArray = [...new Set(childrenArray)]
        for (child in childrenArray) {
            let selectedChild = childrenArray[child]
            let grandchildArray = []
            for (let i in categories) {
                if((selectedNode === categories[i][0]) && (selectedChild === categories[i][1]) && categories[i][2]) {
                    grandchildArray.push(categories[i][2])
                }
            }
            let childObject = {
                name: selectedChild,
                children: grandchildArray
            }
        childrenArray[child] = childObject
        }
        let categoryObject = {
            name: selectedNode,
            children: childrenArray
        }
        firstNode[i] = categoryObject
    }
    res.send(firstNode)
})

let accessTokenStorage 
let bankHashTable = {
    "ins_39" : "rbc",
    "ins_38" : "scotiabank",
    "ins_42" : "td",
    "ins_41" : "bmo",
    "ins_37" : "cibc",
    "ins_40" : "tangerine",
    "ins_46" : "desjardins",
    "ins_48" : "national bank of canada",
    "ins_115575" : "vancity",
    "ins_120010" : "atb",
}

router.post('/token-exchange', async (req, res) => {
    console.log("want to exchange token")
    // this will be from the client side frontend
    const { public_token } = req.body;  
    // use public token to get accessToken
    const { access_token: accessToken } = await plaidClient.exchangePublicToken(public_token);
    accessTokenStorage = accessToken
    console.log(accessToken);

    const authResponse = await plaidClient.getAuth(accessToken);
    // console.log('Auth response:');
    // console.log(util.inspect(authResponse, false, null, true));
    // console.log('---------------');
    // // I probably do not need identity response
    const identityResponse = await plaidClient.getIdentity(accessToken);
    // console.log('Identity response:');
    // console.log(util.inspect(identityResponse, false, null, true));
    // console.log('---------------');
    // this is the main part I need, the balanceResponse data
    
    const balanceResponse = await plaidClient.getBalance(accessToken);
    // console.log('Balance response');
    // console.log(util.inspect(balanceResponse, false, null, true));
    // console.log('---------------');
    // console.log("************************", balanceResponse)

    // This is the area I am going to mutate data and standalize it


    let bankname = bankHashTable[balanceResponse.item["institution_id"]]
    console.log("%%%%%%%%%%%bank ", bankname)
    // This is to mutate every item
    let balanceSheet = balanceResponse.accounts.map(element => {return standardlize(element)})

    // console.log("finalformat", balanceSheet)

    function standardlize(object) {
        let {balances, name, type} = object
        let value = balances.current
        let changeMonthToMonth = 0
        // this is how we mutate it
        let nameArray = name.split("")
        // console.log("nameArray", nameArray)
        let newNameArray = nameArray.slice(6, nameArray.length)
        // console.log("newNameArray", newNameArray)
        let newName = newNameArray.join("")
        name = bankname + " " + newName
        if (type.includes("loan") || type.includes("credit")) {type = "liability"; value = value * -1}
        else {type="asset"}
        let standarditem = {name, type, value, changeMonthToMonth}
        // console.log(standarditem)
        return standarditem
    }
    console.log("accessTokenStorage", accessTokenStorage)
    res.status(200).json({balanceSheet});

    console.log("after sending the response, I want to start preparing transaction data")
    try {await plaidClient.getTransactions(accessTokenStorage, "2019-08-27", "2021-08-26"); console.log("Initialize Request")} catch(error) {console.log("Transactions NOT Ready, Preparing.....")}
});

router.post('/transaction', async (req, res) => {
    console.log("want to get transaction")
    // this will be from the client side frontend
    console.log("accessToken", accessTokenStorage)
    // use public token to get accessToken
       
    try 
    {
    let transactionCumulative = []
    let transactionsToFetch = true
    let offset = 0    
    const batchSize = 100
    let bankname

    while (transactionsToFetch) {
        const TransactionResponse = await plaidClient.getTransactions(accessTokenStorage, "2019-08-27", "2021-08-26", {count: batchSize, offset: offset});
        transactionCumulative = [...transactionCumulative, ...TransactionResponse.transactions]
        bankname = bankHashTable[TransactionResponse.item["institution_id"]]
        if (TransactionResponse.transactions.length === 100) {offset += batchSize} else {transactionsToFetch = false}
    }

    console.log('Got 2 years transaction data now', bankname);

    let transactionRecord = transactionCumulative.map(element => {return standardlize(element)})

    function standardlize(object) {
        let {transaction_id, date, name, amount, category} = object
        amount = amount * -1
        category = category.join(", ")
        let standarditem = {transaction_id, date, name, bankname, amount, category}
        return standarditem
    }

    console.log(transactionRecord)
    res.status(200).json(transactionRecord);
    } catch (error) {console.log("Still not ready!")}

    
});

module.exports = router