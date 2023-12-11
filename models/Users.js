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

const Users = mongoose.model('UsersData',UserSchema);

module.exports = Users