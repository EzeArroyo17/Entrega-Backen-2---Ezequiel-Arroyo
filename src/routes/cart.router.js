import { Router } from "express";
const router = Router();
import CartController from "../controllers/cart.controller.js"
const controller = new CartController();


router.post("/", controller.create)
router.get("/:cid", controller.getCart)
router.post("/:cid/product/:pid", controller.addProductToCart)
router.post("/:cid/purchase", controller.finalizePurchase)
router.delete("/:cid/products/:pid",controller.removeProductFromCart );
router.put("/:cid",controller.updateCart);

router.put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
        if (updatedCart) {
            res.json(updatedCart);
        } else {
            res.status(404).json({ error: "Carrito o producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const updatedCart = await cartManager.clearCart(cid);
        if (updatedCart) {
            res.json(updatedCart);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





export default router