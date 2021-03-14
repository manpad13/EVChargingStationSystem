const controller = require('../../controllers/usersController')
const auth = require('../../controllers/middlewares/authorization')

module.exports = function(app){
    app.route('/evcharge/api/admin/users/:username')
    .get([auth.adminAuthorization, controller.usersHandler])
}

