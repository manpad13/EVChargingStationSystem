function request_and_respond (opt,program){ 
  const fs = require('fs')
  const os = require('os')
  const path = require('path')
  var token
  const notesPath = path.resolve(os.homedir(), 'softeng20bAPI.token')
  if(!fs.existsSync(notesPath)){
    token = null    
    console.log("Access Token Not Found!")
  }
  else{
    token = fs.readFileSync(notesPath, 'utf8')
    fs.unlinkSync(notesPath)
    const http = require('http')
    const options = {
      hostname: 'localhost',
      port: 8765,
      path: '/evcharge/api/logout' ,
      method: 'POST',
      headers: {
        'x-observatory-auth': token ,
        'Content-Type': 'application/json'
      }
    }

    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', error => {
      console.error(error)
    })


    req.end()
  }
}

module.exports = function(options,program) {
  request_and_respond(options,program)
}