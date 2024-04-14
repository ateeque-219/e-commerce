import mongoose from "mongoose";

const connect = async()=>{
    try{
      const resp  = await mongoose.connect(mongodb+srv://ateequerahman219:Smar2053@cluster0.ngza5mf.mongodb.net/)
    }
    catch(error){

    }
}