const controller = require('../../controllers/usermodController')
const auth = require('../../controllers/middlewares/authorization')

module.exports = function(app){
    app.route('/evcharge/api/admin/usermod/:username/:password')
    .post([auth.adminAuthorization, controller.usermodHandler])
}

