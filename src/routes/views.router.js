const express = require('express')
const router = express.Router()
const ViewsController = require('../controllers/views.controller.js')

router.get('/', ViewsController.renderHome)
router.get('/products', ViewsController.renderProducts)

module.exports = router