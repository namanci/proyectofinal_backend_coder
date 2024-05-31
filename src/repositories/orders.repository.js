const Order = require('../models/order.model.js')

class OrdersRepository {
    async createOrder(orderData) {
        const order = new Order(orderData)
        return await order.save()
    }

    async getOrderById(orderId) {
        return await Order.findById(orderId).populate('items.product')
    }

    async getOrdersByUserId(userId) {
        return await Order.find({ user: userId }).populate('items.product')
    }
}

module.exports = new OrdersRepository()