import fs from 'fs/promises';


class CartManager {
    constructor(path) {
        this.path = path;
        this.cart = [];
        this.ultId = 0;

        this.cargarCarritos()
    }

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.cart = JSON.parse(data)

            if (this.cart.length > 0) {
                this.ultId = Math.max(...this.cart.map(cart => cart.id)) 
            }

        } catch (error) {
            console.log("Error al cargar los ID", error);

            await this.guardarCarritos()
        }

    }
    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.cart, null, 2))
    }

    async crearCarrito (){
        const nuevoCarrito = {
            id : ++this.ultId,
            products: []
        }
        this.carts.push(nuevoCarrito);

        await this.guardarCarritos();
        return nuevoCarrito;
    }

    
    async getCarritoPorId(carritoId){
        try{
            const carrito = this.cart.find(c => c.id === carritoId)
            if (!carrito) { 
                throw new Error("No existe un carrito con ese id")
                
            }
            return carrito
        }catch (error) {
            console.log(error);
            
        }
    }


    async agregarProductosAlCarrito (carritoId, productoId, quantity = 1){
        const carrito = await this.getCarritoPorId(carritoId);
        const existeProducto = carrito.products.find(p => p.product === productoId)
        
        if (existeProducto) {
            existeProducto.quantity += quantity;
        }else{
            carrito.products.push ({product: productoId, quantity});
        }
        
        await this.guardarCarritos();
        return carrito
    }

}





export default CartManager;