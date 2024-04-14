import { Router } from "express";
import {registerController} from "../controllers/authControllers.js"


const router = Router();
router.route("/register").post(registerController);


export default router