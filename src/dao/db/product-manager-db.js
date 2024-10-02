import ProductModel from "../models/product.model.js"

class ProductManager {
    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {
            if (!title || !description || !price || !img || !code || !stock || !category) {
                error("Todos los campos son obligatorios");
            }


            const existeProducto = await ProductModel.findOne({ code });
            if (existeProducto) { 
                console.log(" El codigo debe ser unico ");
                return null;
            }


            const nuevoProducto = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            })

            await nuevoProducto.save();
            return nuevoProducto;

        } catch (error) {
            console.log("Error al cargar un producto: ", error);
            return null;
        }

    }

    async getProducts() {
        try {
            const arrayProductos = await ProductModel.find();
            return arrayProductos;
        } catch (error) {
            console.log("Error al obtener el producto", error);
            return null;
        }
    }

    async getProductById(id) {
        try {
            const producto = await ProductModel.findById(id);
            if (!producto) {
                console.log("producto no encontrado");
                return null;
            }
            return producto;
        } catch (error) {
            console.log("Error id del producto", error);
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const updated = await ProductModel.findByIdAndUpdate(id, productoActualizado, { new: true });

            if (!updated) {
                console.log("Producto no encontrado");
                return null;
            }

            return updated;
        } catch (error) {
            console.log("Error al actualizar productos", error);
        }
    }

    async deleteProduct(id) {
        try {
            const deleteP = await ProductModel.findByIdAndDelete(id);

            if (!deleteP) {
                console.log("Producto no encontrado");
                return null;
            }


            console.log("Producto eliminado correctamente");

        } catch (error) {
            console.log("Error al eliminar producto");
        }
    }

}

export default ProductManager; 