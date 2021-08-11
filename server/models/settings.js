const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

const settingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    interval:{
        type: String,
        enum: ["1min", "5min", "15min", "30min", "60min"],
        required: true
    },
    commission:{
        type: Number,
        required: true
    },
    balance: Number
});

const settingModel = mongoose.model('Setting', settingSchema, 'settings');

async function getSetting(){ 
    let setting = null;
    try {
        setting = await settingModel.findOne({}).exec();
    } catch (err) {
        //console.error("err=", err)
    }
    return  setting;
}

async function setSetting(newSetting) {
    let setting = null;
    try {
        setting = settingModel.findOneAndUpdate({},newSetting,  {new:true, upsert:true});
    } catch (err) {
        console.error("err=", err)
    }
    return setting;
}


module.exports = {
    getSetting,
    setSetting
}