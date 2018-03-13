const express = require('express')
const routes = express.Router();
const {User} = require('./../../model/UserModel')
const {passport} = require('./../../config/Passport.js')

routes.get('/', (req, res)=>{
    res.render('index');
})

var checkAuthentication = (req, res, next)=>{
    if(req.user){
        next();
    }
    else{
        res.redirect('/login')
    }
}

routes.get('/profile', checkAuthentication, (req, res)=>{
    res.render('profile', {user : req.user})
})

routes.get('/login', (req, res)=>{
    res.render('login', {message : req.flash('message')});
})


routes.post('/login', passport.authenticate('local-login', {failureRedirect : '/login', successRedirect : '/profile'}))


routes.get('/signup', (req, res)=>{
    res.render('signup', {message : req.flash('message')});  
})



routes.post('/signup', passport.authenticate('local-signup', {failureRedirect : '/signup', successRedirect : '/profile'}))


routes.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
})
module.exports = routes;