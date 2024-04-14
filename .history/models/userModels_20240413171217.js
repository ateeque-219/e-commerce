import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      type: st
    }
})


export user = mongoose.model('user',userschema)