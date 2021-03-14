'use strict'
const Events = require('../models/EventsModel')
const Points = require('../models/PointsModel')
const utilities = require('./utilities')
var exit_flag = false

exports.sessionsPerProvider = async function(req, res, next){
    let _providerID = parseInt(req.params.providerID)
    let _startDate = utilities.date_format(req.params.yyyymmdd_from)
    let _endDate = utilities.date_format(req.params.yyyymmdd_to)
    var points= []
    await Points.find({providerID: _providerID} , async function(err, _points){
        if (err) console.log("query error")
        if (_points.length == 0) {
            exit_flag = true
            console.log(`Could not find points with providerID : ${_providerID}`)
            return res.status(402).send("No data") //res.json(`Could not find points with providerID : ${_providerID}`)
        }
        else{
            points = _points
        }
    })
    if (exit_flag == false){
        var sessionsList = []
        var i
        var last_index = 0
        for(i=0; i < points.length; i++){   
            await Events.find({
                pointID: points[i].pointID,
                connectionTime: {"$gt": _startDate },
                disconnectionTime: {"$lt": _endDate }
            },  
            async function(err, sessions){
                if(err) console.log("query error")
                if (sessions.length == 0) {
                    exit_flag = true
                    console.log(`I found zero sessions for pointID : ${ points[i].pointID }`)
                    //return res.status(402).send("No data")
                }
                else {
                    sessions.sort(function(a,b){
                        return new Date(a.connectionTime) - new Date(b.connectionTime)
                    })
                    var totalEnergy = 0
                    var j
                    for (j=0; j< sessions.length; j++){
                        let _totalCost =  points[i].costPerkWh * sessions[j].kWhDelivered
                        let sessionsInfo = {       
                            "ProviderID": points[i].providerID,
                            "ProviderName": points[i].providerName,
                            "StationID": points[i].stationID,
                            "SessionID": sessions[j].sessionID,
                            "VehicleID": sessions[j].vehicleID,
                            "StartedOn": sessions[j].connectionTime,
                            "FinishedOn": sessions[j].disconnectionTime,
                            "EnergyDelivered": 0,
                            "CostPerKWh": points[i].costPerKWh,
                            "TotalCost": _totalCost
                        }
                        totalEnergy += sessions[j].kWhDelivered
                        sessionsList.push(sessionsInfo)
                    }
                    for (j=last_index; j< sessions.length + last_index; j++){
                        sessionsList[j]["EnergyDelivered"] = totalEnergy
                    }                
                    last_index += sessions.length
                }
            })        
        }
        var result = sessionsList
        return res.json(result)      
    }
        
    
}