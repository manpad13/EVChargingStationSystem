const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/UsersModel')

exports.generateAuthKey = function(_username, secret){
    return jsonwebtoken.sign( { username: _username }, secret)
}

exports.date_format = function(date){
    let Year = new String(date).substring(0,4)
    let Month = new String(date).substring(4,6)
    let Day = new String(date).substring(6,8)
    let res = Year + '-' + Month + '-' + Day + 'T' +'00:00:00Z'
    return res
}

exports.findUser_byCredentials = async function(_username, _password){
    const res = await User.findOne({username : _username, password: _password})
    return res
}

exports.setUserConnectionTo = async function(_username, connection){
    const res = await User.findOneAndUpdate({username: _username}, {isConnected: connection}, {useFindAndModify: false})
    return res
}