const CartsService = require('../services/carts.service.js')

class CartsController {
    async getCart(req, res, next) {
        try {
            const userId = req.user._id
            const cart = await CartsService.getCartByUserId(userId)
            res.status(200).json(cart)
        } catch (error) {
            next(error)
        }
    }

    async addItem(req, res, next) {
        try {
            const userId = req.user._id
            const { productId, quantity } = req.body
            const updatedCart = await CartsService.addItemToCart(userId, productId, quantity)
            res.status(200).json(updatedCart)
        } catch (error) {
            next(error)
        }
    }

    async removeItem(req, res, next) {
        try {
            const userId = req.user._id
            const { productId } = req.body
            const updatedCart = await CartsService.removeItemFromCart(userId, productId)
            res.status(200).json(updatedCart)
        } catch (error) {
            next(error)
        }
    }

    async clearCart(req, res, next) {
        try {
            const userId = req.user._id
            const updatedCart = await CartsService.clearCart(userId)
            res.status(200).json(updatedCart)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CartsController()