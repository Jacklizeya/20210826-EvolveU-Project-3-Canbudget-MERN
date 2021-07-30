const express = require('express');
const router = express.Router();

const settingDB = require('../models/settings');
//const serverSetting  = require('../models/loadServerSetting');

router.get('/', async (req, res) => {
  console.info(`Settings retrieved `)
  res.send(await settingDB.getSetting());
});

router.patch('/', async (req, res) => {
  try {
    const data = await settingDB.setSetting(req.body);
    res.send(data);
    console.log(`Setting saved`);
  }
  catch (error) {
    console.error("Saving setting error: ",error)
    res.sendStatus(500)
  }
});


module.exports = router;