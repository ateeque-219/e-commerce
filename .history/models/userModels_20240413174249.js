import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema({
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
    },
    phone:{
        type:String
    }
},{
    timestamps:true
})


export user = mongoose.model("user",userSchema)