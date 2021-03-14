'use strict'
const Events = require('../models/EventsModel')
const Points = require('../models/PointsModel')
const Vehicles = require('../models/VehiclesModel')
const utilities = require('./utilities')
var exit_flag = false


exports.sessionsPerPoint =async function(req, res, next){
    exit_flag = false
    let _pointID = req.params.pointID
    let _startDate = utilities.date_format(req.params.yyyymmdd_from)
    let _endDate = utilities.date_format(req.params.yyyymmdd_to)
    let _PointOperator
    await Points.find({pointID: _pointID} ,async function(err, point){
        if (err) console.log("query error")
        if (point.length == 0) {
            exit_flag = true
            console.log(`Could not find pointID : ${_pointID}`)
            return res.status(402).send("No data") //res.json(`Could not find pointID : ${_pointID}`)
        }
        else{
            _PointOperator = point[0].operator
        }
    })
    if(exit_flag === false){
        await Events.find({
            pointID: _pointID,
            connectionTime: {"$gt": _startDate },
            disconnectionTime: {"$lt": _endDate }
        },  
        async function(err, sessions){
            if(err) console.log("query error")
            if (sessions.length == 0){
                exit_flag = true
                console.log(`Could not find pointID: ${_pointID} from date ${_startDate} to date ${_endDate} `)
                //return res.status(402).send("No data") //res.json(`Could not find pointID: ${_pointID} from date ${_startDate} to date ${_endDate} `)
            }
            else{
                sessions.sort(function(a,b){
                    return new Date(a.connectionTime) - new Date(b.connectionTime)
                })
                var sessionsList = []    
                let _vehicleType;
                var i;
                for(i=0; i < sessions.length;i++){   
                    await Vehicles.findById({_id: sessions[i].vehicleID} ,async function(err, vehicle){
                        if(err) console.log("query error")
                        if (vehicle.length == 0) {
                            console.log(`Could not find vehicleID : ${sessions[i].vehicleID}`)
                            return res.status(402).send("No data") //res.json(`Could not find vehicleID : ${sessions[i].vehicleID}`)
                        }
                        else{
                            _vehicleType = vehicle.type
                        }
                    })        
                    let sessionInfo = {            
                        "SessionIndex": i+1,
                        "SessionID": sessions[i].sessionID,
                        "StartedOn": sessions[i].connectionTime,
                        "FinishedOn": sessions[i].disconnectionTime,
                        "Protocol" : null,
                        "EnergyDelivered": sessions[i].kWhDelivered,
                        "Payment": sessions[i].paymentMethod,
                        "VehicleType":  _vehicleType
                    }
                    sessionsList.push(sessionInfo)
                }
                var result = {
                    "Point": _pointID,
                    "PointOperator": _PointOperator,
                    "RequestTimestamp": Date.now(),
                    "PeriodFrom": _startDate,
                    "PeriodTo": _endDate,
                    "NumberOfChargingSessions": sessions.length,
                    "ChargingSessionsList": sessionsList
                }
                return res.json(result)
            }
        })
    }
    
}