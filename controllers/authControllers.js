import {user} from "../models/userModels.js"
import bcrypt from 'bcrypt';
import Order from "../models/orderModels.js"

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
const updateProfileController = async (req, res) => {
    try {
      const userId = req.User._id; // Assuming the user ID is available in req.user after authentication
      const { name, password, phone, address } = req.body;
  
      const updateData = {};
      if (name) updateData.name = name;
      if (password) updateData.password = await bcrypt.hash(password, 8); // Password will be hashed by the pre-save hook in the model
      if (phone) updateData.phone = phone;
      if (address) updateData.address = address;
  
      const updatedUser = await user.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update profile",
        error: error.message,
      });
    }
  };

const testController = async(req,res)=>{
    res.send("protected route")
}

const getAllOrdersController = async (req, res) => {
    try {
      const orders = await Order
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: -1 }); // Ensuring the sort value is an object with key-value pairs
      res.json(orders);
    } catch (error) {
      console.error("Error while getting orders:", error);
      res.status(500).send({
        success: false,
        message: "Error while getting orders",
        error: error.message,
      });
    }
  };


 const getAdminOrdersController = async (req, res) => {
    try {
      const orders = await Order
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error:error.message
      });
    }
  };

  const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };
export {loginController,getAdminOrdersController,orderStatusController,getAllOrdersController,registerController,updateProfileController,testController,forgotPassword}



