const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;//using oauth2
const User=require('../models/UserSchema');
const crypto=require('crypto');
passport.use(new GoogleStrategy(
    {
    clientID:"710770012933-p6dm2otvsj2hjcs44rgmbdjei7kdaopq.apps.googleusercontent.com",
    clientSecret:"bslHTPAo90bEzum3suPTCuGM",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accesstoken,refreshtoken,profile,done)
    {
        console.log(profile);
        User.findOne({Email:profile.emails[0].value},function(err,user)
        {
            if(err)
            {
                console.log("Error in finding in db",err);
                return done(err);
            }
            if(!user)
            { 
                //If  this email is not registered in our website then create a new account with random password using crypto
                User.create({
                    Email:profile.emails[0].value,
                    Name:profile.displayName,
                    avatar:profile.photos[0].value,
                    Password:crypto.randomBytes(20).toString('hex')
                },function(err,user)
                {
                    if(err)
                    {
                        console.log("Error in creating account",err);
                        return done(err);
                    }
                        return done(null,user);
                        
                })

            }
            else
            {
                return done(null,user);
            }
        })
    }
    ));

module.exports=passport;