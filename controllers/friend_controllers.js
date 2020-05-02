const User=require('../models/UserSchema');

module.exports.addFriend=function(req,res)
{
    //signed in users info is in "req.user" set during passport auth
    User.findById(req.user.id,function(err,user){
        if(err){console.log(err);return res.redirect('back')}

        user.Friends.push(req.params.friendId);
        //console.log(req.params.friendId+" "+user);
        user.save(function(err)
        {
            if(err)
            console.log("Error in saving",err);
        });
        //you can also goto schema with id=req.params.friendId and add his friend, if required
        return res.redirect('back');
    })
}

module.exports.showFriends=function(req,res)
{
    User.findById(req.user.id).
    populate('Friends').
    exec(function(err,user)
    {
        if(err)
        {
            console.log(err);
            return res.redirect('back');
        }
        return res.render('friends',{user});
    })
}

module.exports.removeFriends=function(req,res)
{
    User.findByIdAndUpdate(req.user.id,{$pull:{Friends:req.params.friendId}},function(err,user)
    {
        if(err)
        {
            console.log(err);
            return res.redirect('back');
        }
        return res.redirect('back');
        
    })
}