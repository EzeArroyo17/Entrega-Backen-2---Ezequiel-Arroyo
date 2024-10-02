import CartModel from "../models/cart.model.js";
class CartManager {

    async CartCreate() {
        try {
            const newCart = new CartModel({ products: [] })
            await newCart.save()
            return newCart
        } catch (error) {
            console.log("Error");
            throw new Error("No se pudo crear el carrito");
            
        }
    }


    async getCarritoById(cartId) {
        try {
            const cart = await CartModel.findById(cartId)
            if (!cart) {
                console.log("El carito solicitado no existe");
                return null
            }
            return cart
        } catch (error) {
            console.log(error);
            throw error

        }
    }


async agregarProductosAlCarrito(carritoId, productoId, quantity = 1) {
    try {
        const carrito = await this.getCarritoById(carritoId);
        const existeProducto = carrito.products.find(item => item.product.toString() === productoId);

        if (existeProducto) {
            existeProducto.quantity += quantity;
        } else {
            carrito.products.push({ product: productoId, quantity });
        }
        carrito.markModified("products");
        await carrito.save();
        return carrito;
    } catch (error) {
        console.log("Error al cargar producto");
        throw error;
    }

}



async removeProductFromCart(cartId, productId) {
    try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            console.log("Carrito no encontrado");
            return null;
        }

        cart.products = cart.products.filter(item => item.product.toString() !== productId);
        await cart.save();
        return cart;
    } catch (error) {
        console.log("Error al eliminar producto del carrito", error);
        throw error;
    }
}

async updateCart(cartId, products) {
    try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            console.log("Carrito solicitado inexistente");
            return null;
        }

        cart.products = products;
        await cart.save();
        return cart;
    } catch (error) {
        console.log("Error al actualizar carrito", error);
        throw error;
    }
}

async updateProductQuantity(cartId, productId, quantity) {
    try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            console.log("El carrito solicitado no existe");
            return null;
        }

        const product = cart.products.find(item => item.product.toString() === productId);
        if (product) {
            product.quantity = quantity;
            cart.markModified("products");
            await cart.save();
        }

        return cart;
    } catch (error) {
        console.log("Error al actualizar cantidad de producto", error);
        throw error;
    }
}

async clearCart(cartId) {
    try {
        const cart = await CartModel.findById(cartId);
        if (!cart) {
            console.log("El carrito solicitado no existe");
            return null;
        }

        cart.products = [];
        await cart.save();
        return cart;
    } catch (error) {
        console.log("Error al limpiar carrito", error);
        throw error;
    }
}
}




export default CartManager;