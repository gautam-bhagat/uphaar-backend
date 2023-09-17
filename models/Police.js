const mongoose = require('mongoose')

const PoliceSchema = mongoose.Schema({
    pname : {
        type : String
    },
    paddress : {
        type:String
    },
    pcity : {
        type : String
    },
    pstate : {
        type : String
    },
    ppincode : {
        type : String
    },
    plat : {
        type : String
    },
    plong : {
        type : String
    },
    pphone : {
        type : String
    }
})

const Police = mongoose.model('Police',PoliceSchema);

module.exports = Police