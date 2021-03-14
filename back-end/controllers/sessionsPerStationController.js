'use strict'
const Events = require('../models/EventsModel')
const Points = require('../models/PointsModel')
const utilities = require('./utilities')
var exit_flag = false



exports.sessionsPerStation = async function(req, res, next){
    let _stationID = parseInt(req.params.stationID)
    let _startDate = utilities.date_format(req.params.yyyymmdd_from)
    let _endDate = utilities.date_format(req.params.yyyymmdd_to)
    var points= []
    await Points.find({stationID: _stationID} , async function(err, _points){
        if (err) console.log("query error")
        if (_points.length == 0) {
            exit_flag = true
            console.log(`Could not find points with stationID : ${_stationID}`)
            return res.status(402).send("No data")//(`Could not find points with stationID : ${_stationID}`)
        }
        else{
            points = _points
        }
    })
    if (exit_flag == false) {
        var i
        var SessionsSummaryList = []
        var visitedPoints = []
        var pointOperators =[]
        var totalSessions_for_the_duration = 0
        for(i=0; i < points.length; i++){   
            if (!pointOperators.includes(points[i].operator)) {
                pointOperators.push(points[i].operator)
            }
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
                if (sessions.length != 0){
                    totalSessions_for_the_duration += sessions.length
                    sessions.sort(function(a,b){
                        return new Date(a.connectionTime) - new Date(b.connectionTime)
                    })
                    let visitedPointsInfo = {            
                        "PointID": points[i].pointID,
                        "PointSessions": sessions.length,
                        "EnergyDelivered": 0
                    }
                    var j
                    for (j=0; j< sessions.length; j++){
                        if (!visitedPoints.includes(sessions[j].pointID)) {
                            visitedPoints.push(sessions[j].pointID)
                            visitedPointsInfo["EnergyDelivered"] = sessions[j].kWhDelivered
                        }
                        else{
                            visitedPointsInfo["EnergyDelivered"] += sessions[j].kWhDelivered
                        }
                    }
                    SessionsSummaryList.push(visitedPointsInfo)
                }
            })        
        }
        var _totalEnergyDelivered = 0
        for (i=0; i < SessionsSummaryList.length; i++){
            _totalEnergyDelivered += SessionsSummaryList[i]["EnergyDelivered"]
        }
        var result = {
            "StationID": _stationID,
            "Operators": pointOperators,
            "RequestTimestamp": Date.now(),
            "PeriodFrom": _startDate,
            "PeriodTo": _endDate,
            "TotalEnergyDelivered": _totalEnergyDelivered,
            "NumberOfChargingSessions": totalSessions_for_the_duration,
            "NumberofActivePoints": SessionsSummaryList.length,
            "SessionsSummaryList": SessionsSummaryList
            
        }
        return res.json(result)
    }
    
    
}