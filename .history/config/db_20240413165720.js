import mongoose from "mongoose";

const connectDb = async()=>{
    try{
      const resp  = await mongoose.connect("process.env.MONGODB_URI");
      console.log(`database is connected `)
    }
    catch(error){

    }
}