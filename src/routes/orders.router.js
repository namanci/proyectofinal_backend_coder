const express = require('express')
const router = express.Router()
const OrdersController = require('../controllers/orders.controller.js')
const { isAuthenticated } = require('../middlewares/auth.middleware')

router.post('/', isAuthenticated, OrdersController.createOrder)
router.get('/:orderId', isAuthenticated, OrdersController.getOrder)
router.get('/user/:userId', isAuthenticated, OrdersController.getUserOrders)

module.exports = router