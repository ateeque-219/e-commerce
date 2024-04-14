import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      type: String,
      require : true,
      trim:true,
    },
    password:{
        type: String,
        requre: true
    }
})


export user = mongoose.model('user',userschema)