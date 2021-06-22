var express = require('express');
var router = express.Router();

const userDB = require('../models/user');


router.get('/', async (req, res) => {
  let data = await userDB.getUserList();
  console.info(`Users retrieved: `, data?.length)
  res.send(data);
});

router.post("/", async (req, res) => {
  let inputData = req.body
  try {
  let newUser = await userDB.createUser(inputData);
  res.send(newUser)} catch (error){console.log(error)}
})

module.exports = router;
