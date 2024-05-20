import { Router } from "express";
import { isAdmin, veryfyJwt } from "../middleware/authMiddleware.js";
import { CreateProductController, braintreePaymentController, braintreetokenController, deleteProductController, filterProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productControllers.js";
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
router.route("/related-product/:pid/:cid").get(relatedProductController);
router.route("/product-category/:slug").get(productCategoryController);
router.route("/braintree/token").get(braintreetokenController);
router.route("/braintree/payment").post(veryfyJwt,braintreePaymentController)

export default router;