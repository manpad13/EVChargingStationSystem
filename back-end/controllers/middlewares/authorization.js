const mongoose = require('mongoose')
const config = require('config')
const secretKey = config.get('jwtPrivateKey')
const jsonwebtoken = require('jsonwebtoken')
const secret = "I can tell you my secret"

const User = require('../../models/UsersModel')

exports.userAuthorization = async function (req,res,next){
    let token=req.headers['x-observatory-auth']
    if (!token) {
        return res.status(401).send('Access denied. No token provided')  
    }
    try{
        const decoded = jsonwebtoken.verify(token, secret)
        let user= await User.find({username:decoded.username})
        if (user.length == 0){
            return res.status(401).send("User Not authorized")
        }
        if(user[0].isConnected == "no"){
            return res.status(401).send("User Not authorized")
        }
        // if you reach here you are authorized as User so you can continue
        next()
    }
    catch (ex){
        res.status(400).send('Invalid Token')
    }
}

exports.adminAuthorization = async function(req,res,next){
    const token = req.headers["x-observatory-auth"]
    if (!token) {
        return res.status(401).send('Access denied. No token provided')  
    }
    try{
        const decoded = jsonwebtoken.verify(token, secret)
        if (decoded.isAdmin == false){
          return res.status(401).send('Access denied. You do not have admin authority')
        }
        // if you reach here you are authorized as Admin so you can continue
        next()
    }
    catch (ex){
        res.status(400).send('Invalid Token')
    }
    
}