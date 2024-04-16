import { Router } from "express";
import {loginController, registerController , testController} from "../controllers/authControllers.js"
import {isAdmin, veryfyJwt} from "../middleware/authMiddleware.js"

const router = Router();
router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/test').post(veryfyJwt,isAdmin,testController );
export default router