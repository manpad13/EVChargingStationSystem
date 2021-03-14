const mongoose = require('mongoose')
// the variable app represents our application
const express = require('express')
const app = express()

//Connect to DB
mongoose.connect(
     'mongodb://localhost/EVdb',
     {useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true} ,
     () => console.log('Connected to DB')    
)

if (process.env.NODE_ENV !== 'test'){
    const port = process.env.PORT || 8765
    app.listen(port, () => console.log(`Listening on port ${port}...`))
}

//Middlewarers
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
//Import Routes and register middlewares for each route
const home = require('./routes/home.js')
app.use('/evcharge/api',home)

// register admin endpoints and routes
const admin_resetSessions = require('./routes/admin/resetsessions')
admin_resetSessions(app)
const admin_healthCheck = require('./routes/admin/healthcheck')
admin_healthCheck(app)
const admin_usermod = require('./routes/admin/usermod')
admin_usermod(app)
const admin_users = require('./routes/admin/users')
admin_users(app)
const admin_sessionsupd = require('./routes/admin/sessionsupd')
admin_sessionsupd(app)

const login_and_logout = require('./routes/login_and_logout')
login_and_logout(app)

const sessionsPerPoint = require('./routes/sessionsPerPoint')
sessionsPerPoint(app)
const sessionsPerStation = require('./routes/sessionsPerStation')
sessionsPerStation(app)
const sessionsPerEV = require('./routes/sessionsPerEV')
sessionsPerEV(app)
const sessionsPerProvider = require('./routes/sessionsPerProvider')
sessionsPerProvider(app)

module.exports = app