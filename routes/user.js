const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controllers');

router.get('/',userController.profile);
router.get('/sign-in',userController.sign_in);
router.get('/sign-up',userController.sign_up);
router.post('/create-session',userController.create_session);
router.post('/log-in',userController.log_in);
router.get('/log-out',userController.log_out);


module.exports=router;