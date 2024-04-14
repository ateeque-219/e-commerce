import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      type: String,
      required : true,
      trim:true,
    },
    password:{
        type: String,
        required: true,
    }
    email:{
        type:{
            String
        }
    }
})


export user = mongoose.model('user',userschema)