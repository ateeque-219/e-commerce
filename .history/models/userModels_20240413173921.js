import mongoose ,{Schema} from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      type: String,
      required : true,
      trim:true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        requried:true,
    },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})


export user = mongoose.model('user',userschema)