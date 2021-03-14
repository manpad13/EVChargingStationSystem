const User = require('../models/UsersModel')
const mongoose = require('mongoose')



exports.usermodHandler = async function(req, res, next){
    let _username = req.params.username
    let _password = req.params.password

    User.find({username : _username} , function(err, user){
        if(err) console.log("query error")
        if (user.length == 0) {
            // user was not found so you can create one
            let newUser = new User({ username: _username, password: _password})
            newUser["isAdmin"] = false
            newUser["isConnected"] = "no"
            newUser.save()
            res.json(newUser)
        }
        else {
            // user was found, so you can change his password
            let updatedUser = {
                username : _username,
                password : _password,
                isAdmin : false,
                isConnected : "no"
            }
            User.findOneAndUpdate({username : _username}, {$set: updatedUser} , {upsert: true, useFindAndModify: false} , function(err,doc) {
                if (err) { throw err }
                else return
            }) 
            res.json(updatedUser)
        }
    })
}

