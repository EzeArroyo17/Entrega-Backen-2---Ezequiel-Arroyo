import TicketModel from "../dao/models/ticket.model.js";
import {cartService} from "../services/index.js"
import userModel from "../dao/models/usuarios.model.js"; 
import { generateUniqueCode, calcularTotal } from "../utils/tocken.js" 

class CartController {
    async create(req, res) {
        try {
            const newCart = await cartService.createCart();
            res.status(201).send(newCart);
        } catch (error) {
            res.status(500).send("Error al crear el carrito");
        }
    }


    async getCart (req, res){
        const { cid } = req.params;
        
        try {
            const cart = await cartService.getCartById(cid)
            if(!cart) return res.status(404).send("Carrito no encontrado");
            res.send(cart);
        } catch (error) {
            res.status(500).send("error al leer el carrito")
        }
    }

    async addProductToCart (req, res) {
        const {cid, pid} = req.params;
        const {quantity} = req.body;
        try {const cart = await cartService.getCartById(cid)
            if(!cart) return res.status(404).send("Carrito no encontrado");
            const ProductExists = cart.products.find(item => item.product.toString() === pid);

            if(ProductExists){
                ProductExists.quantity += quantity;
            }else{
                cart.products.push({product: pid, quantity});
            }
            
            await cartService.updateCart(cid, cart);
            res.send(cart)
        } catch (error) {
            res.status(500).send("error al agregar producto al carrito")
        }
    }

    async removeProductFromCart(req, res) {
        const { cid, pid } = req.params;
        try {
            const updatedCart = await this.cartService.removeProductFromCart(cid, pid);
            if (updatedCart) {
                res.status(200).json(updatedCart);
            } else {
                res.status(404).json({ error: "Carrito o producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCart(req, res) {
        const { cid } = req.params;
        const { products } = req.body;
        try {
            const updatedCart = await this.cartService.updateCart(cid, { products });
            if (updatedCart) {
                res.status(200).json(updatedCart);
            } else {
                res.status(404).json({ error: "Carrito no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async finalizePurchase (req, res){
        const cartId = req.params.cid;

        try {
            const cart = await cartService.getCart(cartId);
            const products = cart.products;

            const productsNotAvailable = []

            for (const item of products) {
                const product = await cartService.getProductById(item.product)
                
                if (product.stock >= item.quantity) {
                    product.stock -= item.quantity;
                    await product.save()
                }else{
                    productsNotAvailable.push(item.product)
                }
            }   
            const userWithCart = await userModel.findOne ({cart: cartId})
            
            const ticket = new TicketModel({
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: calcularTotal (cart.products),
                purchase: userWithCart._id
            });
            await ticket.save()
            
            cart.products = cart.products.filter(item => !productsNotAvailable.includes(item.product.toString()))
            await cart.save()

            res.render("checkout", {
                cliente: userWithCart.first_name,
                email: userWithCart.email,
                numTicket: ticket._id
            })
        } catch (error) {
            res.status(500).json({error: "Error interno del servido"})
        }
    }
}

export default CartController;

