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
        return res.redirect('/');
    }


    return res.render('sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    
    if (req.isAuthenticated()){
        {
           
            return res.redirect('/');
        }
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
            req.flash('error','User already registered!!');
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
                
                //  //checking for friend..will comment it later
                // User.findById(user.id,function(err,user1)
                // {
                //     if(err)
                //     {
                //         console.log("Again failed",err);
                //         return res.redirect('back');
                //     }
                //     console.log(user1);
                    
                //     user.Friends.push(user1.id);
                //     user.save();
                    
                    
                    
                // })
                req.flash('success','Hurray..Registration done!!');
                return res.redirect('/users/sign-in');
            })
        }
    })
   
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Welcome back '+req.user.Name);
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.flash('success','See you soon '+req.user.Name);
    req.logout();
   
    
    return res.redirect('/');
}


//updating credentials

module.exports.update=function(req,res)
{
    User.findByIdAndUpdate(req.user.id,{Email:req.body.email,Name:req.body.name},function(err,user)
    {
        if(err)
        {
            console.log(err);
            return;
        }
        req.flash('success','Updated Successfully')
        return res.redirect('back');
    })
}