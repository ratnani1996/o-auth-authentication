const mongoose = require('mongoose')
require('dotenv').config({path : './../variables.env'});
var connection = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    mongoose.connection
            .once('connected', ()=>{console.log(`Connection to the database up and running`)})
            .on('error', (err)=>{console.log(err)})
}

module.exports = {connection};