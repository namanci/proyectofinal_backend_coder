const OrdersRepository = require('../repositories/orders.repository.js')
const CartsRepository = require('../repositories/carts.repository.js')
const ProductsRepository = require('../repositories/products.repository.js')

class OrdersService {
    async createOrder(userId) {
        const cart = await CartsRepository.getCartByUserId(userId)
        if (!cart) {
            throw new Error('Cart not found')
        }

        for (const item of cart.items) {
            const product = await ProductsRepository.getProductById(item.product._id)
            if (product.stock < item.quantity) {
                throw new Error(`Product ${product.title} is out of stock`)
            }
            product.stock -= item.quantity
            await product.save()
        }

        const orderData = {
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            totalCost: cart.totalCost
        }

        const order = await OrdersRepository.createOrder(orderData)
        await CartsRepository.clearCart(userId)

        return order
    }

    async getOrderById(orderId) {
        return await OrdersRepository.getOrderById(orderId)
    }

    async getOrdersByUserId(userId) {
        return await OrdersRepository.getOrdersByUserId(userId)
    }
}

module.exports = new OrdersService()