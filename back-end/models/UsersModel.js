'use strict';
const config = require('config');
const mongoose = require('mongoose');
const secret = "I can tell you my secret"
const jwt = require('jsonwebtoken')
const secretKey = config.get('jwtPrivateKey')

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength:5,
        maxlength: 50,
        unique : true
    },
    password: {
        type: String,
        required: true,
        minlength:5,
        maxlength: 1024
    },
    isAdmin: Boolean,
    isConnected: String
})


module.exports = mongoose.model('Users', UsersSchema);