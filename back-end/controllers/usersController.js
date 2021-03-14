const User = require('../models/UsersModel')

exports.usersHandler = async function(req, res, next){
    let _username = req.params.username;

    User.find({username : _username} , function(err, user){
        if(err) console.log("query error")
        if (user.length == 0) {
            // user was not found 
            res.status(402).send("No data")
        }
        else {
            // user was found, so you can show his credentials
            res.json(user[0])
        }
    })
}