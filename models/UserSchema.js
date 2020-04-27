const mongoose=require('mongoose');

const User_Schema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
});

const UserSchema=mongoose.model('user_schema',User_Schema);
module.exports=UserSchema;

  