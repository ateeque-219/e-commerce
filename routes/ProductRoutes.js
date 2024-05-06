import { Router } from "express";
import { isAdmin, veryfyJwt } from "../middleware/authMiddleware.js";
import { CreateProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController } from "../controllers/productControllers.js";
import ExpressFormidable from "express-formidable";



const router = Router();
router.route("/create-product").post(veryfyJwt,isAdmin,ExpressFormidable(),CreateProductController)
router.route("/get-product").get(getProductController)
router.route("/get-product/:slug").get(getSingleProductController)
router.route("/product-photo/:pid").get(productPhotoController)
router.route("product/:pid").delete(deleteProductController)
export default router;