const express = require('express')
const routes = express.Router();
const {User} = require('./../../model/UserModel')
const {passport} = require('./../../config/Passport.js')

routes.get('/', (req, res)=>{
    res.render('index');
})


routes.get('/:username/:password', (req, res)=>{
    var user = new User({
        username : req.params.username,
        password : req.params.password
    })
    user.save()
        .then((newUser)=>{
            console.log(`${newUser} successfully saved`)
            res.send(`${newUser} successfully saved`)
        })
        .catch((err)=>{
            res.send(err)
        })
})

routes.get('/signup', (req, res)=>{
    res.render('signup', {message : req.flash('message')});  
})

routes.post('/signup', passport.authenticate('local', {failureRedirect : '/signup', successRedirect : '/'}))

module.exports = routes;