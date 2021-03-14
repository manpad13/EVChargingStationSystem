function request_and_respond() {
    const fs = require('fs')
    const os = require('os')
    const path = require('path')

    const http = require('http')
    const notesPath = path.resolve(os.homedir(), 'softeng20bAPI.token')
    if(fs.existsSync(notesPath)){
      fs.unlinkSync(notesPath)
    }
    const options = {
      hostname: 'localhost',
      port: 8765,
      path: '/evcharge/api/admin/resetsessions',
      method: 'POST'
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
  module.exports = function() {
    request_and_respond()
  }
  