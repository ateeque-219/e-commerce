import { Router } from "express";
import auth


const router = Router();
router('/register').post(authControllers);