const mongoose=require('mongoose');

var User_Schema=mongoose.Schema({
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
    },
    Friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'userschema'
   
        }
   
    ]
    
},
    {
        timestamps:true
});

User_Schema.index({Friends: 1}, {sparse: true})
// User_Schema.virtual('friends',{
//     ref: 'User',
//     localField: '_id',
//     foreignField: 'Friends',
 
//     justOne: false,
//  },{ toJSON: { virtual: true } }); /* toJSON option is set because virtual fields are not included in toJSON output by default. So, if you don't set this option, and call User.find().populate('refereals'), you won't get anything in refereals */

const UserSchema=mongoose.model('userschema',User_Schema);

// var dummy=new UserSchema;
// dummy.Name="rahat";
// dummy.Email="dummy@gmail.com";
// dummy.Password="123";
// dummy.Friends=[dummy.ObjectId];

module.exports=UserSchema;

  