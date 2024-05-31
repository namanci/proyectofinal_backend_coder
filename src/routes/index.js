const express = require('express')
const router = express.Router()

const viewsRouter = require('./views.router.js')
const usersRouter = require('./users.router.js')
const productsRouter = require('./products.router.js')
const cartsRouter = require('./carts.router.js')
const ordersRouter = require('./orders.router.js')

router.use('/', viewsRouter)
router.use('/api/users', usersRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/orders', ordersRouter)

module.exports = router