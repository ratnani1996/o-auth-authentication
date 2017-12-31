const routes = require('express').Router();
const {passport} = require('../../config/Passport');
const {User} = require('../../model/UserModel');

var checkAuthentication = (req, res, next)=>{
    if(req.user){
        next();
    }
    else{
        res.redirect('/login')
    }
}

routes.get('/profile', checkAuthentication, (req, res)=>{
    res.render('profile', {user : req.user});
})

routes.get('/login', passport.authenticate('facebook', { scope : ['user_friends']}));

routes.get('/callback', passport.authenticate('facebook', {failureRedirect : '/login'}), (req, res)=>{
    res.redirect('/auth/facebook/profile')
});


module.exports = routes;