import mongoose from "mongoose";

const connect = async()=>{
    try{
      const resp  = await mongoose.connect("proces")
    }
    catch(error){

    }
}