const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./../model/UserModel')
const FacebookStrategy = require('passport-facebook');
require('dotenv').config({path : '../variables.env'})
const GoogleStrategy = require( 'passport-google-oauth2' );

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then((user)=>{
            done(null, user)
        })    
        .catch((err)=>{
            done(err);
        })
})

passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
    session : false
}, (req, email, pass, done)=>{
    User.findOne({username : email})
        .then((user)=>{
            if(user){
                return done(null, false, req.flash('message', 'User already exists') );
            }
            else{
                var newUser = new User({
                    username : email,
                    password : pass
                })
                newUser.save()
                       .then((user)=>{
                           console.log(`User ${user.username} saved to database`);
                           done(null, user);
                       })
            }
        })
        .catch((err)=>{
            console.log(err);
            done(err, null, req.flash('message' , 'It happened to have some error'));
        })
}))

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
    session : false
}, (req, email, pass, done)=>{
    User.findOne({username : email})
        .then((user)=>{
            if(user){
                // return done(null, user)
                if(user.comparePassword(pass)){
                    return done(null, user);
                }
                else{
                    return done(null, false, req.flash('message' , `Password is wrong`))
                }
            }
            else{
                return done(null, false, req.flash('message', 'User does not exists please sign up'))
            }
        })
        .catch((err)=>{
            console.log(err);
            done(err, null, req.flash('message' , 'It happened to have some error'));
        })
1

}))
passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOne({facebookID : profile.id.toString() })
            .then((storedUser)=>{
                if(storedUser){
                    return done(null, storedUser);
                }
                else{
                    var user = new User({
                        facebookID: profile.id,
                        username : profile.displayName
                    });
                    user.save()
                        .then((newUser)=>{
                            return done(null, newUser);
                        })
                }
            })
            .catch((err)=>{
                return done(err, false, req.flash('message', 'Some error has occured we will get back at you'))
            })
        
    
        

  }
))


passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
},
function(accessToken, refreshToken, profile, done) {
    User.findOne({googleID : profile.id.toString()})
        .then((storedUser)=>{
            if(storedUser){
                done(null, storedUser);
            }
            else{
                var user = new User({
                    googleID : profile.id,
                    username : profile.displayName
                })
                user.save()
                    .then((user)=>{
                        console.log(`Saved to the database ${user.username}`)
                        done(null, user);
                    })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
))

module.exports = {passport}