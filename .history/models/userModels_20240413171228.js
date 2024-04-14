import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username :{
      type: String,
      require : true
    }
})


export user = mongoose.model('user',userschema)