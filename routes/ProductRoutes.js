import { Router } from "express";
import { isAdmin, veryfyJwt } from "../middleware/authMiddleware.js";
import { CreateProductController, deleteProductController, filterProductController, getProductController, getSingleProductController, productCountController, productListController, productPhotoController, searchProductController, updateProductController } from "../controllers/productControllers.js";
import ExpressFormidable from "express-formidable";



const router = Router();
router.route("/create-product").post(veryfyJwt,isAdmin,ExpressFormidable(),CreateProductController)
router.route("/get-product").get(getProductController)
router.route("/get-product/:slug").get(getSingleProductController)
router.route("/product-photo/:pid").get(productPhotoController)
router.route("/delete-product/:pid").delete(deleteProductController)
router.route("/update-product/:pid").put(veryfyJwt,isAdmin,ExpressFormidable(),updateProductController)
router.route("/filter-products").post(filterProductController);
router.route("/product-count").get (productCountController);
router.route("/product-list/:page").get( productListController);
router.route("/search-product/:keyword").get(searchProductController);
export default router;