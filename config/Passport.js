const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('./../model/UserModel')

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

passport.use(new LocalStrategy({
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


module.exports = {passport}