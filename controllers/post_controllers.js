const Post=require('../models/Post');

module.exports.createPost=function(req,res)
{
    Post.create({
        content:req.body.content,
        user:req.user.id,//during authentication req.user contains user info
        
    },function(err,post)
    {
        if(err)
        {
            console.log("********Error in creating Post********",err);
            return res.redirect('back');
        }
        //console.log(post);
        return res.redirect('back');
    })
}