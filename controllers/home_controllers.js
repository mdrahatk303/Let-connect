const Post=require('../models/Post');
const User=require('../models/UserSchema');

module.exports.home=function(req,res)
{
    Post.find({}).
    populate('user').
    populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).
    exec(function(err,posts)
    {
       
        return res.render('home',{title:'home',url:req.url,posts});
    })
    
}
