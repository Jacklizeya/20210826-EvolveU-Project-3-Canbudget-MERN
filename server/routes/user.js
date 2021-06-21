var express = require('express');
var router = express.Router();

const userDB = require('../models/user');


router.get('/', async (req, res) => {
  let data = await userDB.getUserList();
  console.info(`Users retrieved: `, data?.length)
  res.send(data);
});

module.exports = router;
