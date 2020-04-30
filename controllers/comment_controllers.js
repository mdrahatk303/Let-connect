const Comment=require('../models/Comment');
const Post=require('../models/Post');

module.exports.createComment=function(req,res)
{
    Post.findById(req.body.postId,function(err,post)
    {
        if(err)
        {
            console.log("Error in finding post",err);
            return res.redirect('back');
        }
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.postId,
                user:req.user.id
            },function(err,comment)
            {
                if(err)
                {
                    console.log("error in creating comment",err);
                    return res.redirect('back');
                }
                // console.log("herrrrrrrrr");
                post.comments.push(comment);
                post.save();

                return res.redirect('back');

            })
        }
        else{
            console.log('post doesnot exist in database');
            return res.redirect('back');
        }
    })
}