const catchAsync = require('../utils/catchAsync');
const Group = require('../models/groupModel');
const Chat = require('../models/chatModel');




exports.createGroup = catchAsync(async(req,res)=>{
    req.body.createdBy = req.user._id;
    req.body.members = [req.user._id];
    req.body.membersCount=1;
    let added = await Group.create(req.body);
    if(added) {
        res.send({status:true,message:"Group created", data:added}); 
    } else {
        res.send({status:false, message:"Group not created", data:{}});
    }
});


exports.getAllGroups = catchAsync(async(req,res)=>{
    let skip = 0
    let limit = req.query.limit?req.query.limit:10;
    let page = req.query.page?req.query.page:1;
    if (page != 1) {
        skip = (page - 1) * parseInt(limit)
    }

    let query = {members:{$in:[req.user._id]}};
    if(req.query.search) {
        query.name = { $regex: `.*${req.query.search}.*`, $options: 'i' }
    }
    let found = await Group.find(query).sort({createdAt:-1}).populate("createdBy","_id profilePic name").populate("members","_id profilePic name").select({members:1,image:1,name:1,membersCount:1,description:1,createdBy:1}).skip(skip).limit(limit);
    if(found.length>0) {
        res.send({status:true, message:"Group List", data:found});
    } else {
        res.send({status:false, message:"No Group data", data:[]});
    }
});

exports.addMembers = catchAsync(async(req,res)=>{
    let groupId = req.body.groupId;
    let found = await Group.findOne({_id:groupId});
    if(found){
        let c = found.membersCount+1;
        await Group.findOneAndUpdate({_id:req.body.groupId},
            {$push:{members:req.body.member},membersCount:c});
        res.send({status:true,message:"member added",data:found})
    }
    else{
        return res.send({status:false, message:"members not added"});
    }
    
})