'use strict'
var controller = require('../controllers/sessionsPerPointController')
const auth = require('../controllers/middlewares/authorization')
// 
module.exports = function(app){
    app.route('/evcharge/api/sessionsPerPoint/:pointID/:yyyymmdd_from/:yyyymmdd_to')
        .get([auth.userAuthorization, controller.sessionsPerPoint])

}