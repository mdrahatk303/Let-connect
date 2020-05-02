const express=require('express');
const router=express.Router();
const passport=require('passport');

const friendController=require('../controllers/friend_controllers');

router.get('/addfriend/:friendId',passport.checkAuthentication,friendController.addFriend);
router.get('/showfriends',passport.checkAuthentication,friendController.showFriends);
router.get('/remfriends/:friendId',passport.checkAuthentication,friendController.removeFriends);


module.exports=router;