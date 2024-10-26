import { Router } from "express";
const router = Router(); 
import ProductController from "../controllers/product.controller.js";
const controller = new ProductController()

router.get("/", controller.getProducts )
router.get("/:pid", controller.getProductsById )
router.post("/", controller.createProduct )


export default router