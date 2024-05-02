import  jwt from "jsonwebtoken";
import { user } from "../models/userModels.js";



const veryfyJwt = async(req,res,next)=>{
   
    try {
    const decodedToken =  req.headers.authorization ;
    console.log(decodedToken);
     if(!decodedToken){
        return res.status(200).send({
            success:false,
            message:"unauthorized access",
            error:error.message
        })
     }
     const token =  jwt.verify(decodedToken,process.env.TOKEN_SECRET);
     if(!token){
        return res.status(200).send({
            success:false,
            message:"unauthorized access",
            error:error.message
        })
     }
     const User = await user.findById(token?._id).select("-password");
     if(!User){
        return res.status(200).send({
            success:false,
            message:"unable to access by this user",
            error:error.message
        })
     }
     req.User = User;
    //  console.log(User);
     next();
    }
     catch (error) {
        // console.log(error)
        res.status(500).send({
            success:false,
            error:error.message
        })
   
     }
}


const isAdmin = async(req,res,next)=>{
    try{
    const uuser = await user.findById(req.User._id);
    //  console.log(req.User);
    if(uuser?.role !== 1){
        return res.status(401).send({
            message:`${uuser?.username}`,
            success:false,
            error:error.message
        })
    }
    else {
        next();
    }
}
catch(err){
    console.log(err)
    res.status(500).send({
        message:"something went wrong admin middleware",
        error:err.message,
        success:false
     
    })
}
}

export {veryfyJwt,isAdmin}


