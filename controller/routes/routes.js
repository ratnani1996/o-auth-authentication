const express = require('express')
const routes = express.Router();
const {User} = require('./../../model/UserModel')

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
    res.render('signup', {message : ""});  
})

routes.post('/signup', (req, res)=>{
    var user = new User({
        username : req.body.email,
        password : req.body.password
    })
    user.save()
        .then((newUser)=>{
            res.send(` ${newUser.username} added to the database`)
        })
        .catch((err)=>{
            res.redirect('/');
        })
})

module.exports = routes;