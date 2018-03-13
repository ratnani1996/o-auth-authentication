const routes = require('express').Router();
const {passport} = require('../../config/Passport');

var checkAuthentication = (req, res, next)=>{
    if(req.user){
        next();
    }
    else{
        res.redirect('/login');
    }
}

routes.get('/profile', checkAuthentication, (req, res)=>{
    res.render('profile', {user : req.user})
})

routes.get('/login', passport.authenticate('google', {scope : ['profile']}));

routes.get('/redirect',  passport.authenticate('google', {failureRedirect : '/login', successRedirect : '/auth/google/profile'}));

module.exports = routes;
