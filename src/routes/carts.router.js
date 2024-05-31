const express = require('express')
const router = express.Router()
const CartsController = require('../controllers/carts.controller.js')
const { isAuthenticated } = require('../middlewares/auth.middleware')

router.get('/', isAuthenticated, CartsController.getCart)
router.post('/add', isAuthenticated, CartsController.addItem)
router.post('/remove', isAuthenticated, CartsController.removeItem)
router.post('/clear', isAuthenticated, CartsController.clearCart)

module.exports = router