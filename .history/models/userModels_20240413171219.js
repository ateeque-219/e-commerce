import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      type: String
    }
})


export user = mongoose.model('user',userschema)