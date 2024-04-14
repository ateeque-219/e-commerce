import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name :{

    }
})


export user = mongoose.model('user',userschema)