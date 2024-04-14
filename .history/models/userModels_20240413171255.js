import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      type: String,
      require : true,
      trim:true,
    },
    password:{
        
    }
})


export user = mongoose.model('user',userschema)