import { Router } from "express";
import {registerController} from "."


const router = Router();
router.route("/register").post(registerController);