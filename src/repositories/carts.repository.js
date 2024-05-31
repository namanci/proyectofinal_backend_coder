const Cart = require('../models/cart.model.js')

class CartsRepository {
    async createCart(userId) {
        const cart = new Cart({ user: userId })
        return await cart.save()
    }

    async getCartByUserId(userId) {
        return await Cart.findOne({ user: userId }).populate('items.product')
    }

    async addItemToCart(userId, productId, productPrice, quantity) {
        const cart = await this.getCartByUserId(userId)
        if (!cart) {
            cart = await this.createCart(userId)
        }

        const itemIndex = cart.items.findIndex(item => item.product.equals(productId))
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity
        } else {
            cart.items.push({ product: productId, quantity })
        }

        cart.totalCost = cart.totalCost + (quantity * productPrice)

        await cart.save()
        return cart
    }

    async removeItemFromCart(userId, productId) {
        const cart = await this.getCartByUserId(userId)
        const itemIndex = cart.items.findIndex(item => item.product.equals(productId))
        cart.totalCost = cart.totalCost - (cart.items[itemIndex].quantity * cart.items[itemIndex].product.price)
        cart.items = cart.items.filter(item => !item.product.equals(productId))
        await cart.save()
        return cart
    }

    async clearCart(userId) {
        const cart = await this.getCartByUserId(userId)
        cart.totalCost = 0
        cart.items = []
        await cart.save()
        return cart
    }
}

module.exports = new CartsRepository()