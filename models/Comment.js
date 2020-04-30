const mongoose=require('mongoose');

const PostSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SchemaOfPost'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userschema'
    }
},
{
    timestamps:true
});

const Post=mongoose.model('SchemaOfComment',PostSchema);
module.exports=Post;