import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username :{
      type: String,
      required : true,
      trim:true,
    },
    password:{
        type: String,
        required: [true, 'password is required'],
    },
    email:{
        type:String,
        requried:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        requried:true
    },
    role:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,8);
    next();
});


userSchema.methods.isPasswordCorrect = async function(password){
   return  await bcrypt.compare(password,this.password)
}


userSchema.methods.tokenGenerate = async function(){
    return jwt.sign(
        {
            _id : this.id
        },
        process.env.TOKEN_SECRET,
        {
           expiresIn: process.env.TOKEN_EXPIRY,
        }
    )
}

export const user = mongoose.model("user",userSchema)