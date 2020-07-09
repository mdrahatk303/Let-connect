const User = require('../models/UserSchema');
const fs=require('fs');
const path=require('path');

module.exports.profile = function(req, res){
    //console.log(req.query+" fgfgfth");
    User.findById(req.params.userId,function(err,user)
    {
        console.log(user);
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
            console.log("errror in finding");
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

module.exports.update= async function(req,res)
{
    
    // User.findByIdAndUpdate(req.user.id,{Email:req.body.email,Name:req.body.name},function(err,user)
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //         return;
    //     }
    //     req.flash('success','Updated Successfully')
    //     return res.redirect('back');
    // })

    try {
        let user=await User.findById(req.user.id);
        
        User.uploadedAvatar(req,res,function(err)
        {
            if(err)
            {
                console.log("Multer error",err);
                req.flash('error','Multer Error')
                return res.redirect('back');

            }
            user.Name=req.body.name;
            user.Email=req.body.email;
            console.log(req.file);
            if(req.file)
            {
                

               // If already image->remove it before adding new image
               if(user.avatar)
               {
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
               }
                user.avatar=User.avatarPath+'/'+req.file.filename;
            }
            user.save();
        });
        req.flash('success','Updated Successfully')
        return res.redirect('back');
        
    } catch (error) {
        console.log("Error",error);
        return;
    }
    


}