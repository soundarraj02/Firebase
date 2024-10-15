const {sendNotification} = require("../utils/notification");
const catchAsync = require('../utils/catchAsync');


exports.sendNotification = catchAsync(async(req,res,next) => {
    await sendNotification(req.user._id.toString(),req.user._id.toString(),"Message from paytm", "10% discount", "Offer", "image link", {postId:"postId"});
    res.send({status:true,message:"message send"});
});
