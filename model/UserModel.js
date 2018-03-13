



const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
    username : {
        type : String
    },
    facebookID: {
        type :String,
        default : null
    },
    googleID: {
        type : String,
        default : null
    },
    password : {
        type : String,
        default : null
    }
})

UserSchema.pre('save', function(next){
    var user = this;
    if(!this.isModified('password')){
        return next();
    }
    else{
        bcrypt.genSalt(10, (err, salt)=> {
            if(err){
                return next(err);
            }
            bcrypt.hash(this.password, salt, function(err, hash) {
                user.password = hash;
                return next();
            });
        });
    }
    
})


UserSchema.methods.comparePassword = function comparePassword(password){
    var user = this;
    console.log(user)
    return bcrypt.compareSync(password, user.password);
}



const User = mongoose.model('UserCollection', UserSchema)

module.exports = {User};