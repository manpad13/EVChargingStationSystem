const mongoose = require('mongoose')

async function checkConnectivity(req, res, next){
    mongoose.Promise = global.Promise
    try {
        await mongoose.connect('mongodb://localhost/EVdb', {useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
        res.json({status : "OK"})
    }
    catch(error){
        res.status(201).send({status : "Failed to connect to DataBase"})
    }
}


module.exports = function(app){
    app.route('/evcharge/api/admin/healthcheck')
        .get(checkConnectivity)
    
}