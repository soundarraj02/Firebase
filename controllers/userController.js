const User = require("../models/userModel");
const catchAsync = require('../utils/catchAsync');



exports.Onboarding = catchAsync(async(req,res,next) =>{
    const user = req.user;
    let currentUser = await User.findByIdAndUpdate(user._id,{new:true})
 
 if(req.user.role=="vendor") {
    res.status(200).json({
        status:true,
        message:"Vendor onboarded.",
        user:currentUser,
    })
 } else if(req.user.role=="user")
    res.status(200).json({
        status:true,
        message:"User onboarded.",
        user:currentUser,
    })
});

exports.updateUser = catchAsync(async(req,res,next) => {
    if(req.body.lat && req.body.lon) {
        req.body.position = {type:"Point", coordinates:[req.body.lon,req.body.lat]}
    }
    console.log(req.user)
    await User.findOneAndUpdate({_id:req.user._id},req.body);
    let found = await User.findOne({_id:req.user._id})
    if(req.user.role=="vendor") {
        res.send({status:true, message:"Vendor updated", data:found});
    } else if(req.user.role=="user") {
        res.send({status:true, message:"User updated", data:found});
    }
});

exports.getUserDetail = catchAsync(async(req,res,next) => {
    let found = await User.findOne({_id:req.user._id});
    let subscription
    if(found) {
        res.send({status:true, message:"user detail", data:found});
    } else {
        res.send({status:false, message:"User not found", data:{}});
    }
});

exports.deleteAccount = catchAsync(async(req,res)=>{
    let found = await User.findOne({_id:req.user._id});
    if(found) {
        await User.findOneAndUpdate({_id:req.user._id},{isDeleted:true});
        res.send({status:true, message:"User deleted"})
    } else {
        res.status(404).json({status:false, message:"user not found"});
    }
  })




