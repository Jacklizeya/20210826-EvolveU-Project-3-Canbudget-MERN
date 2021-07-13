var express = require('express');
var router = express.Router();

const userDB = require('../models/user');


// get user by Id
router.get('/:id', async (req, res) => {
  try {
  
  let userId = req.params.id
  console.log("getonlyone", userId)
  let data = await userDB.findById(userId);
  console.info(`Users retrieved: `, data?.length)
  res.send(data);} catch (error) {res.send(error)}
});


// get all users
router.get('/', async (req, res) => {
  try {let data = await userDB.getUserList();
  console.info(`Users retrieved: `, data?.length)
  res.send(data);} catch (error) {res.send(error)}
});


// For Cash Flow

router.put("/:id/addcashflow/", async(req, res) => {
  try {
  let userId = req.params.id
  let newCashFlow = req.body
  console.log(userId, newCashFlow)
  let response = await userDB.addCashFlow(userId, newCashFlow)
  res.send(response)
  } catch (error) {res.send(error)}
})

router.put("/:id/deletecashflow/", async(req, res) => {
  try {
  console.log("Want to delete something", req.params.id, req.body)
  let userId = req.params.id
  let {nameOfItemToRemove} = req.body
  console.log(userId, nameOfItemToRemove)
  let response = await userDB.removeCashFlow(userId, nameOfItemToRemove)
  res.send(response)} catch (error) {res.send(error)}
})



// for BalanceSheet

router.put("/:id/addbalancesheet/", async(req, res) => {
  try {let userId = req.params.id
  let newBalanceSheet = req.body
  console.log(userId, newBalanceSheet)
  let response = await userDB.addBalanceSheet(userId, newBalanceSheet)
  res.send(response)} catch (error) {res.send(error)}
})

router.put("/:id/deletebalancesheet/", async(req, res) => {
  try {console.log("Want to delete something", req.params.id, req.body)
  let userId = req.params.id
  let {nameOfItemToRemove} = req.body
  console.log(userId, nameOfItemToRemove)
  let response = await userDB.removeBalanceSheet(userId, nameOfItemToRemove)
  res.send(response)} catch (error) {res.send(error)}
})

//  For new user

router.post("/", async (req, res) => {
  let inputData = req.body
  try {
  let newUser = await userDB.createUser(inputData);
  res.send(newUser)} catch (error){ res.send(error)}
})




module.exports = router;
