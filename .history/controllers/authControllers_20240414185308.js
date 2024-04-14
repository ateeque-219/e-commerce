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
    res.status(200).send({
       message :""
    })
   }
}
catch(error){

}
}

export {registerController}