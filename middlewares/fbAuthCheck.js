const { auth } = require('firebase-admin');
const AppError = require("../utils/apiError");
const { getAuth, signInWithCustomToken } = require("firebase/auth");
const User = require("../models/userModel");

require('../utils/fbConfig')
require('dotenv').config();


exports.requiresAuth = async (req, res, next) => {
    const idToken = req.header("Authorization");
    if (!idToken) {
      return next(new AppError("Please pass firebase auth token ", 400));
    }
    const bearer = idToken.split(' ')
    const token = bearer[1]
    try {
        let email;
      const decodedToken = await auth().verifyIdToken(token, true);
      let user = await User.findOne({ firebaseUid: decodedToken.uid });
      if(user){
        let activeUser = await User.findOne({firebaseUid: decodedToken.uid, isActive:true });
        if(!activeUser) {
          return res.send({sttaus:false, message:"Your account is blocked"})
        }
        user.isNewUser = false;
        await user.save();
        
      } else {
        
        if(decodedToken.email){
            email =decodedToken.email.toLowerCase();
          }
  
        if (req.baseUrl + req.path === "/v1/user/onboarding") {
            user = await User.create({
              email: email,
              firebaseUid: decodedToken.uid,
              role:"user",
              firebaseSignInProvider:decodedToken.firebase.sign_in_provider,
              isEmailVerified:decodedToken.email_verified,
              isNewUser:true,
              position:{type:"Point",coordinates:[0,0]}
          });
        } else if (req.baseUrl + req.path === "/v1/vendor/onboarding") {
        
            user = await User.create({
              email: email,
              firebaseUid: decodedToken.uid,
              role:"vendor",
              firebaseSignInProvider:decodedToken.firebase.sign_in_provider,
              isEmailVerified:decodedToken.email_verified,
              isNewUser:true,
              position:{type:"Point",coordinates:[0,0]}
          });
        }  else if (req.baseUrl + req.path === "/v1/admin/onboarding") {
        
          user = await User.create({
            email: email,
            firebaseUid: decodedToken.uid,
            role:"admin",
            firebaseSignInProvider:decodedToken.firebase.sign_in_provider,
            isEmailVerified:decodedToken.email_verified,
            isNewUser:true,
            position:{type:"Point",coordinates:[0,0]}
        });
      } 
        else {
          return next(new AppError("You are not authorized", 401));
        }
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
  

exports.restrictTo = (...roles) =>{
    return (req,res,next) =>{
        if(req.baseUrl + req.path === "/vendor/onboarding" && req.user.role==="vendor"){
          return next(new AppError('You already have an account with this details.',400));
        }
        if(req.baseUrl + req.path === "/user/onboarding" && req.user.userType==="user"){
          return next(new AppError('You already have an account with this details.',400));
        }
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action',403));
        }
        next();
    }
};

exports.generateToken = async(req,res,next) => {
    try{
        const token =  await auth().createCustomToken(req.params.uid);
        const user = await signInWithCustomToken(getAuth(),token);
        const idToken = user._tokenResponse.idToken
        
        return res.status(200).json({
            status: true,
            token: idToken
        });
        
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:false,
            msg:err.message
        })
    }

}