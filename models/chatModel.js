const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Group",
        default:null
    },
    message:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    status:{
      type:String,
      enum:["sent","read"],
      default:"sent"
    }
  },{
    timestamps:true
  });
  
module.exports = mongoose.model('Chat', chatSchema);