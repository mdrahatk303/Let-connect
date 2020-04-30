const User = require('../models/UserSchema');


module.exports.profile = function(req, res){
    User.findById(req.params.userId,function(err,user)
    {
        if(err)
        {
            console.log(err);
            return res.redirect('back');
        }
        return res.render('profile', {title: 'User Profile',userInfo:user})
    })
    
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: "Codeial | Sign In"
    })
} 

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.ConfirmPassword){
        console.log("here")
        return res.redirect('back');
    }


    //console.log(req.body);
    User.findOne({Email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log("errror in findind");
            return res.redirect('back');
        }
        if(user)
        {
            console.log(user);
            return res.redirect('back');
        }
        else{
            User.create({
                Name:req.body.name,
                Email:req.body.email,
                Password:req.body.password
            },function(err,user)
            {
                if(err)
                {
                    console.log("Error in creating user",err);
                    return res.redirect('back');
                }
                return res.redirect('/users/sign-in');
            })
        }
    })
   
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    
    req.logout();
   

    return res.redirect('/');
}