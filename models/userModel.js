const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        default:"Unknown"
    },
    email: { 
        type: String,
        required:true
    },
    phoneNumber: {
        type: String,
        default:"+11111111111"
    },
    gender:{
        type:String,
        enum:["male","female","prefer not to say"],
        deafult:"prefer not to say"
    },
    age:{
        type:Number,
        default:0
    },
    address:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    restaurantName:{
        type: String,
        default:"Unknown"
    },
    restaurantLogo:{
        type: String,
        default:""
    },
    restaurantBanner:{
        type: String,
        default:"Unknown"
    },
    location:{
        type: String,
        default:"Unknown"
    },
    avgPrice:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        default:"Unknown decription"
    },
    features:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Feature"
    },
    timing:[{day:String,startTime:String,closeTime:String,isActive:Boolean}],
    media:{
        type:[String]
    },
    role:{
        type:String,
        enum:["user","vendor","admin"]
    },
    firebaseUid:{
        type:String,
        unique:true,
        require:true
    },
    firebaseSignInProvider: {
        type: String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isNewUser:{
        type:Boolean
    },
    cuisine:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Cuisine"
    },
    loyaltyCardCount:{
        type:Number,
        default:0
    },
    position:{
        type:{
            type:String,
            default:'Point'
        },
        coordinates:[Number]
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    stripeCustomerId:{
        type:String,
        default:null
    },
    stripeCardId:{
        type:String,
        default:null
    },
    cards:[{
        type:String
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
  },{
    timestamps:true
  });
  
userSchema.index({position: '2dsphere'});

module.exports = mongoose.model('User', userSchema);