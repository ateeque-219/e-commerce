import { Router } from "express";
import { isAdmin, veryfyJwt } from "../middleware/authMiddleware.js";
import { CreateCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = Router()
router.route("/create-category").post(veryfyJwt,isAdmin,CreateCategoryController)
router.route("/update-category/:id").put(veryfyJwt,isAdmin,updateCategoryController)
router.route("/get-category").get(getCategoryController)
router.route("/single-category/:slug").get(getSingleCategoryController)
router.route("/delete-category/:id").delete(deleteCategoryController)


export default  router;