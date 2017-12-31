const express = require('express')
const app = express();
require('dotenv').config({path : './variables.env'});
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
//requiring passport
const passport = require('passport')
const flash = require('connect-flash')

//connect to the database
const {connection} = require('./config/Connection')
connection();

app.use(morgan('dev'))
app.use(cookieParser());
app.use(session({
    secret : process.env.SESSION_SECRET,
    saveUninitialized : true,
    resave : true,
    cookie : {
        //secure : true
        maxAge :10*60*1000
    }
}))

//initialising passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.use(require('./controller/routes/routes'));
app.use('/auth/facebook', require('./controller/routes/facebookRoutes'))
app.use('/auth/google', require('./controller/routes/googleRoutes'));
app.use((req, res)=>{
    res.status(404).send('Trying to be smart BRO!!!!')
})
app.listen(process.env.PORT, ()=>{
    console.log(`Listening to port ${process.env.PORT}`)
})