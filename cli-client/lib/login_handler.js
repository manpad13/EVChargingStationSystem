function request_and_respond(opt, program) {
    const http = require('http')
    const fs = require('fs')
    const os = require('os')
    const path = require('path')
    var tok
    const notesPath = path.resolve(os.homedir(), 'softeng20bAPI.token')
    try {
        fs.unlinkSync(notesPath);
      } catch (error) {}
    if (("username" in opt) && ("passw" in opt)) {
        const data = JSON.stringify({
            username: opt["username"],
            password: opt["passw"]
        })

        const options = {
            hostname: 'localhost',
            port: 8765,
            path: '/evcharge/api/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
    
        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
                process.stdout.write(d)
                if(d.toString().includes("token")){
                    tok = (JSON.parse(d.toString()))["token"]
                    if (tok != undefined) {
                        fs.appendFile(notesPath, tok, function(err) {
                            if (err) throw err;
                        })
                        exports.tok = tok;
                    }else{
                        console.log("Error No token Provided!")
                    }
                }
                
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
module.exports = function(options, program) {
    request_and_respond(options, program)
}
