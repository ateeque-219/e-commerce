import { Router } from "express";
import {forgotPassword, getAllOrdersController, loginController, registerController , testController, updateProfileController} from "../controllers/authControllers.js"
import {isAdmin, veryfyJwt} from "../middleware/authMiddleware.js"
const router = Router();
router.route('/register').post(registerController);
router.route('/login').post(loginController);
 router.route('/test').get(veryfyJwt,isAdmin,testController );
router.route('/profile').put(veryfyJwt,updateProfileController)
router.route('/forgot-password').post(forgotPassword);
router.route('/orders').get(veryfyJwt,getAllOrdersController)

router.get('/user-auth',veryfyJwt,(req,res)=>{
console.log(req.headers.authorization)
res.status(200).send({ok:true});
})

router.get('/admin-auth',veryfyJwt,isAdmin,(req,res)=>{

    console.log(req.headers.authorization)
    res.status(200).send({ok:true});
    })



export default router