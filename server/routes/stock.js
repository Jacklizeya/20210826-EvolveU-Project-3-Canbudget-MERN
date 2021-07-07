const express = require('express');
let router = express.Router();

const stockDB = require('../models/stock');




router.get('/search/:stock', async (req, res) => {
    try {
        let stock = req.params.stock;
        let data = await stockDB.getSmrtList(stock);
        if (data ){
            res.send({data});
        }
        else{
            res.sendStatus(500).send("Can't find stocks");
        }

    } catch (error) {
        res.sendStatus(500).send("Error finding stocks");       
    }
})


  
module.exports = router;
