const express = require('express')
const app = express();
require('dotenv').config({path : './variables.env'});
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//connect to the database
const {connection} = require('./config/Connection')
connection();

app.use(morgan('dev'))
app.use(cookieParser());
app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : true,
    resave : true,
    originalMaxAge : 10*60
}))

app.use(require('./controller/routes/routes'));

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to port ${process.env.PORT}`)
})