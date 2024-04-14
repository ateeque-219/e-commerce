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
        lowe
    },
    role:{
        type:Number,
        default:0
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


export user = mongoose.model("user",userSchema)