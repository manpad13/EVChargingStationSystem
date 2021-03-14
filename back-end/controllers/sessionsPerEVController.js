'use strict'
const Events = require('../models/EventsModel')
const Points = require('../models/PointsModel')
const Vehicles = require('../models/VehiclesModel')
const utilities = require('./utilities')
var exit_flag = false

exports.sessionsPerEV = async function(req, res, next){
    var exit_flag = false
    let _vehicleID = req.params.vehicleID
    let _startDate = utilities.date_format(req.params.yyyymmdd_from)
    let _endDate = utilities.date_format(req.params.yyyymmdd_to)
    var _vehicleType
    await Vehicles.findById({"_id": _vehicleID},async function(err,vehicle){
        if (err) console.log("query error")
        if (!vehicle) {
            exit_flag = true
            console.log(`Could not find vehicleID : ${_vehicleID}`)
            return res.status(402).send("No data") // res.json(`Could not find vehicleID : ${_vehicleID}`)
        }
        else{
            _vehicleType = vehicle.type
        }
    })
    if (exit_flag == false) {
        await Events.find({
            vehicleID: _vehicleID,
            connectionTime: {"$gt": _startDate },
            disconnectionTime: {"$lt": _endDate }
        },  
        async function(err, sessions){
            if(err) console.log("query error")
            if (sessions.length == 0){
                exit_flag = true
                console.log(`Could not find vehicleID: ${_vehicleID} from date ${_startDate} to date ${_endDate} `)
                return res.status(402).send("No data") // return res.json(`Could not find vehicleID: ${_vehicleID} from date ${_startDate} to date ${_endDate} `)
            }
            else{
                sessions.sort(function(a,b){
                    return new Date(a.connectionTime) - new Date(b.connectionTime)
                })
                var sessionsList = []    
                var _visitedPoints = new Array()
                var _totalEnergyConsumed = 0
                var _energyProvider
                var _costPerKWh
                var _sessionCost
                var i
                for(i=0; i < sessions.length ; i++){
                    if (!_visitedPoints.includes(sessions[i].pointID)) {
                        _visitedPoints.push(sessions[i].pointID)
                    }
                    _totalEnergyConsumed += sessions[i].kWhDelivered
                    await Points.findOne({"pointID": sessions[i].pointID} ,async function(err, point){
                        if(err) console.log("query error")
                        if (point.length == 0) {
                            exit_flag == true
                            console.log(`Could not find pointID : ${sessions[i].pointID}`)
                            //return res.status(402).send("No data") //res.json(`Could not find pointID : ${sessions[i].pointID}`)
                        }
                        else{
                            _energyProvider = point.providerName
                            _costPerKWh = point.costPerKWh
                            _sessionCost = _costPerKWh * sessions[i].kWhDelivered
                        }
                    })
                    let sessionInfo = {            
                        "SessionIndex": i+1,
                        "SessionID": sessions[i].sessionID,
                        "EnergyProvider": _energyProvider,
                        "StartedOn": sessions[i].connectionTime,
                        "FinishedOn": sessions[i].disconnectionTime,
                        "EnergyDelivered": sessions[i].kWhDelivered,
                        "PricePolicyRef" : null,
                        "CostPerKWh": _costPerKWh,
                        "SessionCost" : _sessionCost
                    }
                    sessionsList.push(sessionInfo)
                }
                var result = {
                    "vehicleID": _vehicleID,
                    "vehicleType": _vehicleType,
                    "RequestTimestamp": Date.now(),
                    "PeriodFrom": _startDate,
                    "PeriodTo": _endDate,
                    "TotalEnergyConsumed": _totalEnergyConsumed,
                    "NumberOfVisitedPoints": _visitedPoints.length, 
                    "NumberOfVehicleChargingSessions": sessions.length,
                    "VehicleChargingSessionsList": sessionsList
                }
                return res.json(result)
            }
        })
    }
    
}

