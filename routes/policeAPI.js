const express = require('express');
const bypass = require('../middleware/bypass');
const Police = require('../models/Police');

const hospRouter = express.Router();

hospRouter.get('/',bypass, (req, res) => {
    res.send('Police API WORKING')
});


hospRouter.get('/all',bypass,async (req, res) => {
    const all = await Police.find({});
    let obj = {results : all};
    res.status(200).json(obj);
});

hospRouter.post('/add',bypass, async (req,res)=>{
    let success = 0;
    try{
        const {pname,paddress, pcity,pstate,ppincode,plat,plong,pphone} = req.body;
        // console.log(req.body);
        // console.log(pname,paddress, pcity,pstate,ppincode,plat,plong,pphone);
        if(pname && paddress && pcity && pstate && ppincode && plat && plong && pphone){
            const data = new Police(req.body);
            data.save();
            success = 1;
            let message = 'Added';
            return res.status(201).json({success,message})
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
        const {_id, pname,paddress, pcity,pstate,ppincode,plat,plong,pphone} = req.body;

        const query = {"_id":_id}

        //check if data exists
        let found = false
        await Police.exists(query).then(result => {
            if(result) {found = true;}
        })

        //if data exists update it
        if(found){
            await Police.updateOne(query,{'pname':pname,'paddress':paddress, 'pcity':pcity,'pstate':pstate,'ppincode':ppincode,'plat':plat,'plong':plong,'pphone':pphone});

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


hospRouter.delete('/delete',bypass,async (req, res) => {
    try{
        const {_id } = req.body;

        const query = {"_id":_id}

        //check if data exists
        let found = false
        await Police.exists(query).then(result => {
            if(result) {found = true;}
        })

        //if data exists update it
        if(found){
            await Police.deleteOne(query);

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
