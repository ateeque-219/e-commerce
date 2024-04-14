const registerController = async(req,res)=>{
   const {username,password,email,address,phone} = req.body;
   if(username === ""){
    res.send({
      error :'username is required'
    })
   }
   if(username === ""){
    res.send({
      error :'username is required'
    })
   }
}

export {registerController}