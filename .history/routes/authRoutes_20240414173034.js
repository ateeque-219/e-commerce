import { Router } from "express";
import {registerController} from "../con"


const router = Router();
router.route("/register").post(registerController);