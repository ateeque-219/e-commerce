import { Router } from "express";
import {registerController} from "../controllers/"


const router = Router();
router.route("/register").post(registerController);