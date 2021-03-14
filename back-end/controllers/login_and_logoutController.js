'use strict'
const User = require('../models/UsersModel')
const jsonwebtoken = require('jsonwebtoken')
const config = require('config')
const secret = "I can tell you my secret"
const utilities = require('./utilities')

exports.loginHandler = async function(req,res,next){
    const _username = req.body.username
    const _password = req.body.password
    // validation
    if (_username ===undefined || _password===undefined){
        res.status(400).send("Bad Request")
    }
    let result = await utilities.findUser_byCredentials(_username, _password)
    //console.log(result)
    if(!result){
        res.status(400).send("Invalid username and/or password")
    }
    else{
        // login updates the isConnected field of the user    
        await utilities.setUserConnectionTo(_username, "yes")
        // loging was successful and we return a json object 
        const _token = utilities.generateAuthKey(_username, secret)
        res.header('x-observatory-auth', _token).json({ token: _token})
    }
    next()
}

exports.logoutHandler = async function(req,res,next){
    let token = req.headers['x-observatory-auth']
    if (token===undefined){
        res.status(401).send("Not authorized")
    }
    let decoded = jsonwebtoken.decode(token)
    let result = utilities.setUserConnectionTo(decoded.username,"no")
    if (result){
        res.status(200).send("You are logged out")
    }
    else {
        res.status(402).send("No data")
    }
}


