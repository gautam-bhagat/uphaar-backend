const mongoose = require('mongoose')

const FireServiceSchema = mongoose.Schema({
    fname : {
        type : String
    },
    faddress : {
        type:String
    },
    fcity : {
        type : String
    },
    fstate : {
        type : String
    },
    fpincode : {
        type : String
    },
    flat : {
        type : String
    },
    flong : {
        type : String
    },
    fphone : {
        type : String
    }
})

const FireService = mongoose.model('FireService',FireServiceSchema);

module.exports = FireService