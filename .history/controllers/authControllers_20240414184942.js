import {User}

const registerController = async(req,res)=>{
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
   const existingUser = 
}

export {registerController}