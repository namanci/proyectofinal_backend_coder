const express = require('express')
const router = express.Router()
const ViewsController = require('../controllers/views.controller.js')
const { checkRole } = require('../middlewares/checkRole.middleware.js')
const { isAuthenticated } = require('../middlewares/auth.middleware.js')

router.get('/', ViewsController.renderHome)
router.get('/products', ViewsController.renderProducts)
router.get('/products/edit/:id', isAuthenticated, checkRole(['admin', 'premium']), ViewsController.renderEditProduct)
router.get('/my-products', isAuthenticated, checkRole(['admin', 'premium']), ViewsController.renderUserProducts)

module.exports = router