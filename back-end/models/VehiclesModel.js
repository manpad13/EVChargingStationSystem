'use strict';
var mongoose = require('mongoose');

var vehicleSchema = new mongoose.Schema({
    "_id": String,
    "userID": String,
    "brand": String,
    "type": String,
    "model": String,
    "consumption": Number
});

module.exports = mongoose.model('Vehicles', vehicleSchema);