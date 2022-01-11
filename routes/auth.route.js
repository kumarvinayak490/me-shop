
const express= require('express');
const authController=require('../Controllers/auth.controller');

const router=express.Router();

router.get('/sign-up',authController.getSignUp);
router.get("/log-in", authController.getLogIn);

router.post('/sign-up',authController.registration);

router.post('/sign-in',authController.signIn);

router.post('/logout',authController.logout);


module.exports=router;

