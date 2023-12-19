const mongoose = require('mongoose');


const AlertSchema = mongoose.Schema({
    latitude:{
        type: String

    },
    longitude:{
        type: String

    },
    deviceLocation:{
        type: String
    }
});

const Alert = mongoose.model('Alert',AlertSchema);
module.exports = Alert