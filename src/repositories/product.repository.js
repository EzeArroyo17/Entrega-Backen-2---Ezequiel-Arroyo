import productDao from "../dao/product.dao.js"

class ProductRepository{
    async createProduct (productData){
        return await productDao.save(productData)
    }

    async getProductById(id){
        return await productDao.find(id);
    }

    async getProducts(query){
        return await productDao.find(query);
    }

    async updateProduct (id, productData){
        return await product.update(id, productData);
    }

    async deleteProduct(id){
        return await productDao.delete(id)
    }
}

export default ProductRepository;