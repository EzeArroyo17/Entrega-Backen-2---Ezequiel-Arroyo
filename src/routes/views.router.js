import { Router } from "express";
const router = Router(); 
import ProductManager from "../dao/db/product-manager-db.js"
const manager = new ProductManager();


router.get("/login", (req, res) => {
    res.render("login"); 
})

router.get("/register", (req, res) => {
    res.render("register"); 
})


router.get("/products", async (req, res) => {
    const products = await manager.getProducts(); 

    res.render("home", {products});
})

router.get("/realtimeproducts", ( req, res ) => {
    res.render("realtimeproducts")
})

export default router; 