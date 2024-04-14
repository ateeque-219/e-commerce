import {user} from "../models/userModels.js"

const registerController = async(req,res)=>{
    try{
   const {username,password,email,address,phone} = req.body;
   if(username === ""){
    res.send({
      error :'username is required'
    })
   }
   if(password === ""){
    res.send({
      error :'password is required'
    })
   }
   if(email === ""){
    res.send({
      error :'email is required'
    })
   }
   if(phone === ""){
    res.send({
      error :'phone no is required'
    })
   }
   if(address === ""){
    res.send({
      error :'address is required'
    })
   }
   const existingUser = await user.findone({email});
   if(existingUser){
    return res.status(200).send({
       message :"allready registered",
       success:true,
    })
   }
   const User = await user.create({
    username,
    password,
    email,
    address,
    phone,
   })
   const newUser = await user.findById(User._id).select("-password");
   if(!newUser){
     return res.status(500).send({
        message:"user not able to register becaues something went wrong",
        succes:false,
     })
   }
   return res.status(201).send({
    success:true,
    message:'user registered succesfully',
    newUser,
   })
}
catch(error){
 res.status(500).send({
    succes:false,
    message:"Something went wrong while registering",
    error,
 })
}
};


const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email){
            res.send({
                error:'Email should be provided'
            })
        }
        if(!password){
            
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Failed to login",
            error
        })
    }
}

export {registerController,loginController}