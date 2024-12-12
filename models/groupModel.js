const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    members:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    image:{
        type:String,
        default:""
    },
    membersCount:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean,
        default:true
    }
  },{
    timestamps:true
  });
  
module.exports = mongoose.model('Group', groupSchema);