const controller = require('../../controllers/sessionsupdController')
let multer = require('multer')
const os = require('os')
const path = require('path')
const upload_path = path.resolve(os.homedir(), 'OneDrive/Shared/firstRestAPI/destinationFolderForUploads')
let upload = multer({ dest: upload_path })
const auth = require('../../controllers/middlewares/authorization')

module.exports = function(app){
    app.route('/evcharge/api/admin/system/sessionsupd')
    // sexyfile is the name of the key file
    .post([auth.adminAuthorization, upload.array('file'), controller.sessionsupdHandler]);
};
