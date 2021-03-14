'use strict';
var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
    "_id": String,
    "sessionID": String,
    "connectionTime": String,
    "disconnectionTime": String,
    "kWhDelivered": Number,
    "pointID": String,
    "paymentMethod": String,
    "vehicleID" : String,
});

module.exports = mongoose.model('Events', EventsSchema);