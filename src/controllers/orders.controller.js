const OrdersService = require('../services/orders.service.js')

class OrdersController {
    async createOrder(req, res, next) {
        try {
            const userId = req.user._id
            const order = await OrdersService.createOrder(userId)
            res.status(201).json(order)
        } catch (error) {
            next(error)
        }
    }

    async getOrder(req, res, next) {
        try {
            const { orderId } = req.params
            const order = await OrdersService.getOrderById(orderId)
            res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }

    async getUserOrders(req, res, next) {
        try {
            const userId = req.user._id
            const orders = await OrdersService.getOrdersByUserId(userId)
            res.status(200).json(orders)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OrdersController()