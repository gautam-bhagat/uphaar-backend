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

hospRouter.put('/add',bypass, async (req,res)=>{
    let success = 0;
    try{
        const {_id, hname,haddress, hcity,hstate,hpincode,hlat,hlong,hphone} = req.body;

        const query = {"_id":_id}

        //check if data exists
        let found = false
        await Hospital.exists(query).then(result => {
            if(result) {found = true;}
        })

        //if data exists update it
        if(found){
            await Hospital.updateOne(query,{'hname':hname,'haddress':haddress, 'hcity':hcity,'hstate':hstate,'hpincode':hpincode,'hlat':hlat,'hlong':hlong,'hphone':hphone});

            success = 1;
            let message = 'Updated';
            return res.status(201).json({success,message});
        }

        //else return not found
        let message = 'Not Found';
        return res.status(201).json({success,message});
       

    }catch(err){
        console.log(err);
        success = 0;
        let message = 'Internal Server Error';
        res.status(500).json({success,message});
    }
});


hospRouter.delete('/',bypass,async (req, res) => {
    try{
        const {_id } = req.body;

        const query = {"_id":_id}

        //check if data exists
        let found = false
        await Hospital.exists(query).then(result => {
            if(result) {found = true;}
        })

        //if data exists update it
        if(found){
            await Hospital.deleteOne(query);

            success = 1;
            let message = 'Deleted';
            return res.status(201).json({success,message});
        }

        //else return not found
        let message = 'Not Found';
        return res.status(201).json({success,message});

    }catch(err){
        console.log(err);
        success = 0;
        let message = 'Internal Server Error';
        res.status(500).json({success,message});
    }
});


module.exports = hospRouter;
