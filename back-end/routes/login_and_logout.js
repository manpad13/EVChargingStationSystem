var controller = require('../controllers/login_and_logoutController')

module.exports = function(app){
    app.route('/evcharge/api/login')
        .post(controller.loginHandler)

    app.route('/evcharge/api/logout')
        .post(controller.logoutHandler)
}