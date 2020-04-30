const mongoose=require('mongoose');

const Post_Schema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userschema'//schema name on robo3T whithout 's'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SchemaOfComment'
    }]
},
{
    timestamps:true
})

const Post=mongoose.model("SchemaOfPost",Post_Schema);//provide ref:'SchemaOfPost' while refering to post schema

module.exports=Post;