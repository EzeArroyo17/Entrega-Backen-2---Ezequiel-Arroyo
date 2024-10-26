import CartDao from "../dao/cart.dao.js"
const cart = new CartDao()


class CartRepository{
    async createCart(){
        return await cart.save({products: []});
    }

    async getCartById(id){
        return await cart.findById(id);
    }

    async updateCart(id, cartData){
        return await cart.update(id, cartData);
    }

    async deleteCart(id){
        return await cart.delete(id);
    }
}

export default CartRepository