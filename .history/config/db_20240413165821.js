import mongoose from "mongoose";

const connectDB = async()=>{
    try{
      const resp  = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`database is connected ${resp.connection.host}`)
    }
    catch(error){
     console.log(`database connection failed`)
    }
}