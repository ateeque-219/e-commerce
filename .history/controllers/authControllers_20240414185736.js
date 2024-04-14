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
   const newUser = user.findById(User._id).select()
}
catch(error){

}
}

export {registerController}