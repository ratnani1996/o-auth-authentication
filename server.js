const express = require('express')
const app = express();
require('dotenv').config({path : './variables.env'});
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(morgan('dev'))
app.use(cookieParser());
app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : true,
    resave : true,
    originalMaxAge : 10*60
}))

app.get('/',(req, res)=>{
    res.send(`This is a get request to ${req.url}`)
    console.log("===============");
    console.log(req.cookies);
    console.log("===============");
    console.log(req.session);
    console.log("===============");
})

app.get('/limit', (req, res)=>{
    res.send(`This is a get request to ${req.url}`)
    console.log("===============");
    console.log(req.cookies);
    console.log("===============");
    console.log(req.session);
    console.log("===============");
})

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to port ${process.env.PORT}`)
})