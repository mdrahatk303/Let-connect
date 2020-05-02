const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controllers');

router.get('/profile/:userId', passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

//updating credentials
router.post('/update',usersController.update);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);


router.get('/sign-out', usersController.destroySession);



module.exports = router;