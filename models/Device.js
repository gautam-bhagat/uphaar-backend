const mongoose = require('mongoose');


const deviceSchema = mongoose.Schema({
    deviceid : {
        type :  String
    },
    token : {
        type : String
    }
});

const Device = mongoose.model('Device',deviceSchema);
module.exports = Device