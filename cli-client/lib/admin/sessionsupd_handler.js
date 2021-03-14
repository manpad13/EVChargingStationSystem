const fs = require('fs')
const os = require('os')
const path = require('path')
const request = require('request')
var token
const notesPath = path.resolve(os.homedir(), 'softeng20bAPI.token')

function request_and_respond(opt, program) {
    if(!fs.existsSync(notesPath)){
        console.log("Access Token Not Found!")
        token = null
    }
    else{
        token = fs.readFileSync(notesPath, 'utf8')
        if ("source" in opt) {
            const data = JSON.stringify({
                file : opt["source"]
            })
            const filepath = path.resolve(os.homedir(), opt["source"]);

            request.post({
                url: "http://localhost:8765/evcharge/api/admin/system/sessionsupd",
                headers:{
                    'x-observatory-auth': token
                },
                formData: {
                    file: fs.createReadStream(filepath),
                    filetype: 'json'
                }
            },function(error,response,body){
                console.log(body)
            })
        } 
        else {
            program.help()
        }
    }

}
module.exports = function(options, program) {
    request_and_respond(options, program)
}
