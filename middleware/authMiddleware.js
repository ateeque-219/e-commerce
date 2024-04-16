import  jwt from "jsonwebtoken";
import { user } from "../models/userModels.js";



const veryfyJwt = async(req,res,next)=>{
    try {
    const decodedToken = req.cookies.token || req.header("Authorization")
    ?.replace("Bearer ","");
     if(!token){
        res.status(200).send({
            success:false,
            message:"unauthorized access"
        })
     }
     const token = await jwt.veryfy(decodedToken,process.env.TOKEN_SECRET);
     if(!token){
        res.status(200).send({
            success:false,
            message:"unauthorized access"
        })
     }
     const User = user.findById(token?._id).select("-password");
     if(!User){
        res.status(200).send({
            success:false,
            message:"unable to access by this user"
        })
     }
     req.User = User;
     next();
    }
     catch (error) {
        res.status(500).send({
            success:false,
            error:error.message
        })
     }
}


const isAdmin = async(req,res,next)=>{
    const role = await user.findById(req.User._id);
    if(role !== 1){
        return res.status(400).send({
            message:"unauthrorized access ",
            success:false
        })
    }
    else {
        next();
    }
}

export {veryfyJwt,isAdmin}