const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    reciever:{
        type:String
    },
    title:{
        type:String
    },
    body:{
        type:String
    },
    notificationType:{
        type:String,
    },
    isRead:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    data:{
        type:Object
    }
},
    {timestamps:true,versionKey: false}
);

module.exports = mongoose.model("Notification", notificationSchema);
