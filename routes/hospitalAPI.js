const express = require('express');
const bypass = require('../middleware/bypass');
const Hospital = require('../models/Hospital');

const hospRouter = express.Router();

hospRouter.get('/',bypass, (req, res) => {
    res.send('HOSPITAL API WORKING')
});


hospRouter.get('/all',bypass,async (req, res) => {
    const all = await Hospital.find({});
    res.status(200).json(all);
});

hospRouter.post('/add',bypass, async (req,res)=>{
    let success = 0;
    try{
        const {hname,haddress, hcity,hstate,hpincode,hlat,hlong,hphone} = req.body;

    const data = new Hospital(req.body);
    data.save();
    success = 1;
    let message = 'Added';
    res.status(201).json({success,message})
    }catch(err){
        console.log(err);
        success = 0;
        let message = 'Internal Server Error';
        res.status(500).json({success,message});
    }
});

module.exports = hospRouter;
