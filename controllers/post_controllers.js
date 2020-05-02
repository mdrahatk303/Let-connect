const Post=require('../models/Post');
const Comment=require('../models/Comment');

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
        req.flash('success','Post created!!');
        return res.redirect('back');
    })
}


module.exports.destroyPost=function(req,res)
{
    
    
        Post.findById(req.params.postId,function(err,post)
        {
            if(err)
            {
                console.log("Error in finding post",err);
                return res.redirect('back');
            }

            //id is in string whereas _id is an object
            if(post.user==req.user.id)
            {
                post.remove();
                Comment.deleteMany({post},function(err,result)
                {
                    if(err){console.log("error in deleting comment",err);return res.redirect('back');}
                    //res.json(result);
                    
                });
                req.flash('success','Post and associated comments Deleted!!');
                return res.redirect('back');
            }
            else
            {
                return res.redirect('back');
            }
        })
    
}