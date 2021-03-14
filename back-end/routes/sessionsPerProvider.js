'use strict'
var controller = require('../controllers/sessionsPerProviderController')
const auth = require('../controllers/middlewares/authorization')

module.exports = function(app){
    app.route('/evcharge/api/SessionsPerProvider/:providerID/:yyyymmdd_from/:yyyymmdd_to')
        .get([auth.userAuthorization, controller.sessionsPerProvider])
}
