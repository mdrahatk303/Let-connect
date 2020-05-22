const mongoose=require('mongoose');
const path=require('path');
const multer=require('multer');
const AVATAR_PATH=path.join('/uploads/avatar');

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
   
    ],
    avatar:{
        type:String,
        default:""
    }
    
},

    {
        timestamps:true
});

//For uploading
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //  console.log("in userschema");
      cb(null, path.join(__dirname,'..',AVATAR_PATH))//dirname means corrent directory name that is "models"
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })


//static function
User_Schema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');//only file will be uplaoded for fieldname avatar
User_Schema.statics.avatarPath=AVATAR_PATH;
//User_Schema.index({Friends: 1}, {sparse: true})
const UserSchema=mongoose.model('userschema',User_Schema);
module.exports=UserSchema;


