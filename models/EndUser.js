const mongoose = require('mongoose')

const EndUserSchema = mongoose.Schema({
    uname : {
        type : String
    },
    email : {
        type:String
    },
    phone:{
        type:String
    },
    password : {
        type : String
    },
    ucity:{
        type : String
    },
    ustate:{
        type: String
    }
})

const EndUsers = mongoose.model('EndUser',EndUserSchema);

module.exports = EndUsers