import mongoose from "mongoose";

const connect = async()=>{
    try{
      const resp  = await mongoose.connect("process.env.MONGODB_URI");
      console.log(first)
    }
    catch(error){

    }
}