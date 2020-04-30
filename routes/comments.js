const express=require('express');
const router=express.Router();
const passport=require('passport');

const commentController=require('../controllers/comment_controllers');

router.post('/commenting',passport.checkAuthentication,commentController.createComment);
router.get('/destroy/:commentId',passport.checkAuthentication,commentController.destroyComment);



module.exports=router;