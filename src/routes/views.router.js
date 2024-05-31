const express = require('express')
const router = express.Router()
const ViewsController = require('../controllers/views.controller.js')
const { checkRole } = require('../middlewares/checkRole.middleware.js')
const { isAuthenticated } = require('../middlewares/auth.middleware.js')

router.get('/', ViewsController.renderHome)
router.get('/sign-up', ViewsController.renderSignUp)
router.get('/products', ViewsController.renderProducts)
router.get('/products/edit/:id', isAuthenticated, checkRole(['admin', 'premium']), ViewsController.renderEditProduct)
router.get('/my-products', isAuthenticated, checkRole(['admin', 'premium']), ViewsController.renderUserProducts)
router.get('/my-products/new-product', isAuthenticated, checkRole(['admin', 'premium']), ViewsController.renderNewProduct)
router.get('/edit-profile', isAuthenticated, ViewsController.renderEditProfile)
router.get('/manage-users', isAuthenticated, checkRole(['admin']), ViewsController.renderManageUsers)
router.get('/cart', isAuthenticated, ViewsController.renderCart)

module.exports = router