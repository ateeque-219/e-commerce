import { Router } from "express";
import authControllers from


const router = Router();
router.route('/register').post(authControllers);