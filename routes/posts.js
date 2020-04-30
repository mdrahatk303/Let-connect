const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController=require('../controllers/post_controllers');


//For post by user
router.post('/posting',passport.checkAuthentication,postController.createPost);//checking here also for user authentication to post

router.get('/destroy/:postId',passport.checkAuthentication,postController.destroyPost);

module.exports=router;