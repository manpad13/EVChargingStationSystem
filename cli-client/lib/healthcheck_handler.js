function request_and_respond() {
    const http = require('http')
    
    const options = {
      hostname: 'localhost',
      port: 8765,
      path: '/evcharge/api/admin/healthcheck',
      method: 'GET'
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
  