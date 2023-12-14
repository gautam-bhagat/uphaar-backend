const express = require('express');
const bypass = require('../middleware/bypass');
const FireService = require('../models/FireService');

const hospRouter = express.Router();

hospRouter.get('/',bypass, (req, res) => {
    res.send('FIRE SERVICE API WORKING')
});


hospRouter.get('/all',bypass,async (req, res) => {
    const all = await FireService.find({});
    let obj = {results :  all};
    res.status(200).json(obj);
});

hospRouter.post('/add',bypass, async (req,res)=>{
    let success = 0;
    try{
        const {fname,faddress, fcity,fstate,fpincode,flat,flong,fphone} = req.body;
        // console.log(req.body);
        // console.log(hname,haddress, hcity,hstate,hpincode,hlat,hlong,hphone);
        if(fname && faddress && fcity && fstate && fpincode && flat && flong && fphone){
            const data = new FireService(req.body);
            data.save();
            success = 1;
            let message = 'Added';
            return res.status(201).json({success,data,message})
        }

        let message = 'Incomplete Data! Kindly come with complete data!!';
        res.status(500).json({success,message});
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
        const {_id, fname,faddress, fcity,fstate,fpincode,flat,flong,fphone} = req.body;

        const query = {"_id":_id}

        //check if data exists
        let found = false
        await FireService.exists(query).then(result => {
            if(result) {found = true;}
        })

        //if data exists update it
        if(found){
            await FireService.updateOne(query,{'fname':fname,'faddress':faddress, 'fcity':fcity,'fstate':fstate,'fpincode':fpincode,'flat':flat,'flong':flong,'fphone':fphone});

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


hospRouter.get('/:firecity',bypass,async(req,res)=>{
    try {
        const city=req.params.firecity;
        const cityFireStations=await FireService.find({fcity:city});
        let obj = { success: 1, results: cityFireStations };
        res.status(200).json(obj);
    } catch (error) {
        res.send('Error');
    }
})
hospRouter.get('/:firestate',bypass,async(req,res)=>{
    try {
        const state=req.params.firestate;
        const stateFireStations=await FireService.find({fstate:state});
        let obj = { success: 1, data: stateFireStations };
        res.status(200).json(obj);
    } catch (error) {
        res.send('Error');
    }
})
hospRouter.delete('/',bypass,async (req, res) => {
    try{
        const {_id } = req.body;

        const query = {"_id":_id}

        //check if data exists
        let found = false
        await FireService.exists(query).then(result => {
            if(result) {found = true;}
        })

        //if data exists update it
        if(found){
            await FireService.deleteOne(query);

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
