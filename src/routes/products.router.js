const express = require('express')
const ProductsController = require('../controllers/products.controller.js')
const { isAuthenticated } = require('../middlewares/auth.middleware.js')
const { checkRole } = require('../middlewares/checkRole.middleware.js')

const router = express.Router()

router.post('/', isAuthenticated, checkRole(['premium', 'admin']), ProductsController.createProduct)
router.get('/:id', ProductsController.getProductById)
router.get('/', ProductsController.getAllProducts)
router.put('/:id', isAuthenticated, checkRole(['premium', 'admin']), ProductsController.updateProduct)
router.delete('/:id', isAuthenticated, checkRole(['premium', 'admin']), ProductsController.deleteProduct)
router.get('/paginated', ProductsController.getProductsPaginated)

module.exports = router