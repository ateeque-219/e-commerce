import mongoose from "mongoose";

const userschema = new mongoose({})


export user = mongoose.model('user',userschema)