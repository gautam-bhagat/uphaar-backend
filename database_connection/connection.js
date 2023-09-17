const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () =>{
    mongoose.connect(mongoURI,{}).then(()=>{
        console.log("Connected !!");
        
    }).catch(err => console.log(err))
}
 
module.exports = connectToMongo;