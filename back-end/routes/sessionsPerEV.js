'use strict'
var controller = require('../controllers/sessionsPerEVController')
const auth = require('../controllers/middlewares/authorization')

module.exports = function(app){
    app.route('/evcharge/api/SessionsPerEV/:vehicleID/:yyyymmdd_from/:yyyymmdd_to')
        .get([auth.userAuthorization, controller.sessionsPerEV])
}
