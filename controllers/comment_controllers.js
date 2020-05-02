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
                req.flash('success','Commented!!!');
                return res.redirect('back');

            })
        }
        else{
            console.log('post doesnot exist in database');
            return res.redirect('back');
        }
    })
}

module.exports.destroyComment=function(req,res)
{
    Comment.findById(req.params.commentId,function(err,comment)
    {
        if(err)
        {
            console.log(err);
            return res.redirect('back');
        }
        if(req.user.id==comment.user)
        {
            let postId=comment.post;
            comment.remove();

            //Bad way(but conceptual) to delete comment id from post schema
          /*  Post.findById(postId,function(err,post)
            {
                if(err){
                    console.log(err);
                    return;
                }
               // console.log(req.params.commentId+" "+comment.id+" "+comment);
                var index = post.comments.indexOf(comment.id);
                post.comments.splice(index,1);
                post.save();
                return res.redirect('back')
            })
            */
          // console.log(req.params.commentId+" "+comment.id+" "+comment._id);
           Post.findByIdAndUpdate(postId,{$pull:{comments:comment.id}},function(err,post)
           {
               if(err)
               {
                   console.log(err);
                   return res.redirect('back');
               }
              // return res.json(post);
           });
           req.flash('success','Comment Deleted!!');
           return res.redirect('back');
        }
        else
        {
            console.log("Not eligible to delete");
            return res.redirect('back');
        }
    })
}