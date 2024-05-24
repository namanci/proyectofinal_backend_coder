const logger = require('../config/logger.js')
const ProductsRepository = require('../repositories/products.repository.js')

class ProductsService {
    async createProduct(productData) {
        return await ProductsRepository.createProduct(productData)
    }

    async getProductById(productId) {
        return await ProductsRepository.getProductById(productId)
    }

    async getAllProducts() {
        return await ProductsRepository.getAllProducts()
    }

    async updateProduct(productId, updateData, user) {
        const product = await ProductsRepository.getProductById(productId)
        if (product.owner._id.toString() !== user._id.toString() && user.role !== 'admin') {
            throw new Error('Unauthorized')
        }
        return await ProductsRepository.updateProduct(productId, updateData)
    }

    async deleteProduct(productId, user) {
        const product = await ProductsRepository.getProductById(productId)
        if (product.owner._id.toString() !== user._id.toString() && user.role !== 'admin') {
            throw new Error('Unauthorized')
        }
        return await ProductsRepository.deleteProduct(productId)
    }

    async getProductsPaginated(page, limit) {
        return await ProductsRepository.getProductsPaginated(page, limit)
    }
}

module.exports = new ProductsService()