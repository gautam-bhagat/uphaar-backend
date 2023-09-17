const express = require('express')
require('dotenv').config();
// app route
const DeviceRouter = express.Router();
const bypass = require('../middleware/bypass')

// json web token
const jwt = require('jsonwebtoken');
const Device = require('../models/Device');
const secretKey = process.env.JWT_SECRET_KEY;


DeviceRouter.get('/', bypass, async (req, res) => {
    let success =1;
    res.status(201).json({success, 'message' : 'API Working'})
});


DeviceRouter.post('/add',bypass, async (req, res) => {

    let success = 0;
    try{
        const {deviceid } = req.body;
        // console.log(deviceid)
        let data = {
            'deviceid' : deviceid
        };
        const token = jwt.sign(data,secretKey);

        const device = await Device.findOne(data);
        if (device){
            await Device.updateOne(data,{'token':token})
            success =1
            // console.log("Update")
        }else{
            const newDevice =  new Device({
                deviceid:deviceid,
                token:token
            })
            newDevice.save();
            success =1
            // console.log("Insert")
        }
        res.status(201).json({success,token,deviceid})
    }catch(err){
        success = 0;
        console.log(err)
        res.status(500).json({success, 'message' : 'Internal Server Error'});
    }
  
});


module.exports = DeviceRouter