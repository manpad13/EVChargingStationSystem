'use strict'
var controller = require('../controllers/sessionsPerStationController')
const auth = require('../controllers/middlewares/authorization')

module.exports = function(app){
    app.route('/evcharge/api/sessionsPerStation/:stationID/:yyyymmdd_from/:yyyymmdd_to')
        .get([auth.userAuthorization, controller.sessionsPerStation])
}