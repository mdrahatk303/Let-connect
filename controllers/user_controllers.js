const db=require('../config/mongoose');
const User=require('../models/UserSchema');

module.exports.profile=function(req,res)
{
   
    if(req.cookies.user_id)
    {
        //res.clearCookie(req.cookies.user_id);
        User.findById(req.cookies.user_id,function(err,user)
        {
            if(err){console.log("**ERROR***",err); return;}
            if(user)
            return res.render('profile',{title:'Profile',user});
            else
            return res.redirect('/user/sign-in');

        })
       
        
    }
    else
    return res.redirect('/user/sign-in');
}

module.exports.sign_in=function(req,res)
{

    if(req.cookies.user_id)
    {
        //res.clearCookie(req.cookies.user_id);
        return res.redirect('back');
    }
    else
    return res.render('sign_in',{title:'Sign In'});
    //else
    
} 


module.exports.sign_up=function(req,res)
{
    
    if(req.cookies.user_id)
    return res.render('sign_up',{title:'Sign Up'});
    else
    return res.redirect('back');
}

// get the sign up data
module.exports.create_session = function(req, res){
    if (req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({Email: req.body.Email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create({
                Name:req.body.Name,
                Email:req.body.Email,
                Password:req.body.Password
            }, function(err, user){
                if(err){console.log('error in creating user while signing up',err); return}
                console.log("****",user);
                return res.redirect('/user/sign-in');
            })
        }else{
            console.log("User already exist");
            return res.redirect('back');
        }

    });
}

//signing in
module.exports.log_in=function(req,res)
{
    User.findOne({Email:req.body.Email},function(err,user)
    {
        

        if(err)
        {
            console.log("Error in findind user",err);
            return;
        }
        if(user)
        {
            if(user.Password==req.body.Password)
            {
                res.cookie('user_id',user.id,{expires: new Date(Date.now()+4*10000)});//After 40 sec cookie will be deleted
                //console.log("********************HERE******************Match",user.Password,user.Name);
                return res.redirect('/user');
            }
            else{
                 
                return res.redirect('back');
            }
        }
        else{
            return res.redirect('/user/sign-up');
        }
    })
}

module.exports.log_out=(req, res)=>{ 
    //it will clear the userData cookie 
    res.clearCookie('user_id'); 
    return res.redirect('/user/sign-in');
    }; 