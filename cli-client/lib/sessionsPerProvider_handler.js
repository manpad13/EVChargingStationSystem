
function request_and_respond(opt, program) {
    const fs = require('fs')
    const os = require('os')
    const path = require('path')
    var token
    const notesPath = path.resolve(os.homedir(), 'softeng20bAPI.token')
    const http = require('http')
    if(("provider" in opt) && ("datefrom" in opt) && ("dateto" in opt)){
     
      if(!fs.existsSync(notesPath)){
        console.log("Access Token Not Found!")
        token = null
      }
      else{
        token = fs.readFileSync(notesPath, 'utf8')
      }
      const options = {
        hostname: 'localhost',
        port: 8765,
        path: `/evcharge/api/SessionsPerProvider/${opt["provider"]}/${opt["datefrom"]}/${opt["dateto"]}`,
        method: 'GET',
        headers: {
          'x-observatory-auth': token
        }
      }
    
      const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        const chunks = []
        var err 
        res.on('data', function (chunk) {
          err = chunk
          chunks.push(chunk)
        })
        res.on('end', function () {
          const data = Buffer.concat(chunks)
          if(res.statusCode == 200){
            var got = JSON.parse(data)
            console.log(got)
          }else{
            process.stdout.write(data)
          }
        })
       
        
      })
    
      req.on('error', error => {
        console.error(error)
      })
      req.end()
    }
    else {
        program.help()
    }
}  
   
  
module.exports = function(options, program) {
    request_and_respond(options, program)
}
  