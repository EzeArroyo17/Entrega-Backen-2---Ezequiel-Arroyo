import { Router } from "express";
const router = Router();

import CartManager from "../dao/db/cart-manager-db.js"
const cartManager = new CartManager()


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.CartCreate()
        res.json(nuevoCarrito)

    } catch (error) {
        console.log(error);
        
        res.status(500).send("Error del servidor")
    }
})


router.get("/:cid", async (req, res) => {
    let cartId = req.params.cid;

    try {
        const cart = await cartManager.getCarritoById(cartId)
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }
        res.json(cart);
    } catch (error) {
        res.status(500).send("Error al obtener los prodcutos del carrito")
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productsId = req.params.pid;
    let quantity = req.body.quantity || 1;

    try {
        const updated = await cartManager.agregarProductosAlCarrito(cartId, productsId, quantity);
        res.json( updated.products)
    } catch (error) {
        console.log(error);
        
        res.status(500).send("Error al cargar prodcuto")
    }
})



router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await cartManager.removeProductFromCart(cid, pid);
        if (updatedCart) {
            res.json(updatedCart);
        } else {
            res.status(404).json({ error: "Carrito o producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const updatedCart = await cartManager.updateCart(cid, products);
        if (updatedCart) {
            res.json(updatedCart);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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