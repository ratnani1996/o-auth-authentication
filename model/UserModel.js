



const mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true
    },
    password : {
        type : String
    }
})

const User = mongoose.model('UserCollection', UserSchema)

module.exports = {User};