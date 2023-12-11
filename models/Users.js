const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    uname : {
        type : String
    },
    email : {
        type:String
    },
    password : {
        type : String
    }
})

const Users = mongoose.model('User',UserSchema);

module.exports = Users