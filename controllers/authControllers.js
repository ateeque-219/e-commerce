import {user} from "../models/userModels.js"


// for register
const registerController = async(req,res)=>{
    try{
   const {username,password,email,address,phone,answer} = req.body;
   if(username === ""){
     return res.send({
      success:false,
      message :'username is required'
    })
   }
   if(password === ""){
    return res.send({
      success:false,
      message :'password is required'
    })
   }
   if(email === ""){
    return res.send({
      success:false,
      message :'email is required'
    })
   }
   if(phone === ""){
   return res.send({
    success:false,
      message :'phone no is required'
    })
   }
   if(address === ""){
    return res.send({
      success:false,
      error :'address is required'
    })
   }
   if(answer === ""){
    return res.send({
      success:false,
      error :'answer is required'
    })
   }
   const existingUser = await user.findOne({email});
   if(existingUser){
    return res.status(200).send({
       message :"allready registered",
       success:false,
    })
   }
   const User = await user.create({
    username,
    password,
    email,
    address,
    phone,
    answer
   })
   const newUser = await user.findById(User._id).select("-password");
   if(!newUser){
     return res.status(500).send({
        message:"user not able to register because something went wrong",
        success:false,
     })
   }
   return res.status(201).send({
    success:true,
    message:'user registered succesfully',
    newUser,
   })
}
catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).send({
        success: false,
        message: "Something went wrong while registering",
        error: error.message, 
    });
}
};


// for login

 const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        if(!email){
           return res.send({
            success:false,
                error:'Email should be provided'
            })
        }
        if(!password){
         return res.send({
            success:false,
                error:'password is required'
            })
        }
      const foundUser = await user.findOne({email});
      if(!foundUser){
        return res.send({
            success:false,
            error:'No user with the given email matches'
        })
      }
      const isPasswordCorrect = await foundUser.isPasswordCorrect(password);
      if (!isPasswordCorrect) {
          return res.status(401).json({
              success: false,
              error: 'Incorrect password.',
          });
      }
        const token = await foundUser.tokenGenerate()
        const loggedInUser = await user.findById(foundUser._id).select("-password ")
        const options = {
            httpOnly:true,
            secure:true
        }
        res.cookie("token", token, options);

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
            token,
            loggedInUser,
        });

    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({
            success: false,
            message: 'Failed to login.',
            error: error.message, 
        });
    }
};

const forgotPassword = async (req, res) => {
  try {
      const { email, answer, newPassword } = req.body;
      if (!email || !answer || !newPassword) {
          return res.status(400).json({
              success: false,
              message: "Email, answer, and new password are required.",
          });
      }

      const existingUser = await user.findOne({ email, answer });
      if (!existingUser) {
          return res.status(404).json({
              success: false,
              message: "User not found or incorrect answer.",
          });
      }

      // Update the password
      existingUser.password = newPassword;
      await existingUser.save({validateBeforeSave:false});

      return res.status(200).json({
          success: true,
          message: "Password updated successfully.",
      });
  } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({
          success: false,
          message: "Failed to reset password.",
          error: error.message,
      });
  }
};

const testController = async(req,res)=>{
    res.send("protected route")
}
export {loginController,registerController,testController,forgotPassword}




