const Event = require('../models/EventsModel')
const fs = require('fs')
const { exec } = require('child_process')
const { json } = require('body-parser')
const { assert, Console } = require('console')
const { result } = require('lodash')


function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time))
}

exports.sessionsupdHandler = async function(req, res, next){
    var json_file = fs.readFileSync(req.files[0]['path'], 'utf8', (err, data) => {
        if (err) throw err
        return (json_file) 
    })
    let prev = await Event.countDocuments()
    var json_parsed = JSON.parse(json_file)
    var count = Object.keys(json_parsed).length
    var i = 0
    for (_event in json_parsed){
        const one_event = new Event(json_parsed[_event])
        const result = await Event.findOne({ _id : one_event["_id"] });
        if( result == null ) {
            await one_event.save()
            i = i + 1
        }
    }
    
    let response = {
        SessionsInUploadedFile: count,
        SessionsImported: i,
        TotalSessionsInDatabase: prev + i
    }
    res.json(response)
    
    /* 
    // another buggy but fast import
    await sleep(2000)
    let command = "mongoimport --db EVdb --collection events --file " + req.files[0]['path']
    let response = {
        SessionsInUploadedFile: 0,
        SessionsImported: 0,
        TotalSessionsInDatabase: 0
    }
    exec(command, (err, stdout, stderr) =>{
        console.log("All good")
        if(err) return 
        if(stderr) return
        let total = Event.countDocuments()
        
        response['SessionsInUploadedFile'] = count,
        response['SessionsImported'] = total - prev,
        response['TotalSessionsInDatabase'] = total
        res.json(response)
        
    })
    */
}

    





 