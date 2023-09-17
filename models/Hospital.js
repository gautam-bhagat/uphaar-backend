const mongoose = require('mongoose')

const HospitalSchema = mongoose.Schema({
    hname : {
        type : String
    },
    haddress : {
        type:String
    },
    hcity : {
        type : String
    },
    hstate : {
        type : String
    },
    hpincode : {
        type : String
    },
    hlat : {
        type : String
    },
    hlong : {
        type : String
    },
    hphone : {
        type : String
    }
})

const Hospital = mongoose.model('Hospital',HospitalSchema);

module.exports = Hospital