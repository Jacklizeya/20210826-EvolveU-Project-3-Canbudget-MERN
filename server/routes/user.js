var express = require('express');
var router = express.Router();

const userDB = require('../models/user');


router.get('/', async (req, res) => {
  let data = await userDB.getUserList();
  console.info(`Users retrieved: `, data?.length)
  res.send(data);
});


router.put("/addcashflow/:id", async(req, res) => {
  let userId = req.params.id
  let newCashFlow = req.body
  console.log(userId, newCashFlow)
  let response = await userDB.addCashFlow(userId, newCashFlow)
  res.send(response)
})

router.post("/", async (req, res) => {
  let inputData = req.body
  try {
  let newUser = await userDB.createUser(inputData);
  res.send(newUser)} catch (error){console.log(error)}
})



module.exports = router;
