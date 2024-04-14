import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      
    }
})


export user = mongoose.model('user',userschema)