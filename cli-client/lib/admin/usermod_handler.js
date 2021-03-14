
//not sure if required to be logged in as admin

function request_and_respond(opt, program) {
    const fs = require('fs')
    const os = require('os')
    const path = require('path')
    var token
    const http = require('http')
    const notesPath = path.resolve(os.homedir(), 'softeng20bAPI.token')
    if(!fs.existsSync(notesPath)){
        console.log("Access Token Not Found!")
        token = null
    }
    else{
        token = fs.readFileSync(notesPath, 'utf8')
        if (("username" in opt) && ("passw" in opt)) {
            const data = JSON.stringify({
                username: opt["username"],
                password: opt["passw"]
            })

            const options = {
                hostname: 'localhost',
                port: 8765,
                path: `/evcharge/api/admin/usermod/${opt["username"]}/${opt["passw"]}`,
                method: 'POST',
                headers: {
                    'x-observatory-auth': token
                },
                body:{
                    username: opt["username"],
                    password: opt["passw"]
                }
            }
        
            //console.log(options)
            const req = http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
            
                res.on('data', d => {
                process.stdout.write(d)
                })
            })
            
            req.on('error', error => {
                console.error(error)
            })
            
            req.write(data)
            req.end()
        } 
        else {
            program.help()
        }
    }

}
module.exports = function(options, program) {
    request_and_respond(options, program)
}
