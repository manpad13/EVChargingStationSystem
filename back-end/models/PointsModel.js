'use strict';
var mongoose = require('mongoose');

var pointsSchema = new mongoose.Schema({
    "pointID": String,
    "stationID": Number,
    "operator": String,
    "costPerKWh": Number,
    "location":{
        "address": String,
        "country": String,
        "geo": Object
    },
    "providerID": Number,
    "providerName": String,   
    "connections":[Object]
});

module.exports = mongoose.model('Points', pointsSchema);