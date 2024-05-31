const CartsRepository = require('../repositories/carts.repository.js')
const ProductsRepository = require('../repositories/products.repository.js')

class CartsService {
    async createCart(userId) {
        return await CartsRepository.createCart(userId)
    }

    async getCartByUserId(userId) {
        return await CartsRepository.getCartByUserId(userId)
    }

    async addItemToCart(userId, productId, quantity) {
        const product = await ProductsRepository.getProductById(productId)
        if (!product || product.stock < quantity) {
            throw new Error('Product out of stock')
        }
        const productPrice = product.price
        await CartsRepository.addItemToCart(userId, productId, productPrice, quantity)
        return await this.getCartByUserId(userId)
    }

    async removeItemFromCart(userId, productId) {
        return await CartsRepository.removeItemFromCart(userId, productId)
    }

    async clearCart(userId) {
        return await CartsRepository.clearCart(userId)
    }
}

module.exports = new CartsService()