const express = require('express')
const routes = express.Router();
const {User} = require('./../../model/UserModel')

routes.get('/', (req, res)=>{
    res.send("Hello world");
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

module.exports = routes;