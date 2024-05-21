const ProductsService = require('../services/products.service.js')

class ProductsController {
    async createProduct(req, res, next) {
        try {
            const productData = req.body
            productData.owner = req.user.id
            const newProduct = await ProductsService.createProduct(productData)
            res.status(201).json(newProduct)
        } catch (error) {
            next(error)
        }
    }

    async getProductById(req, res, next) {
        try {
            const productId = req.params.id
            const product = await ProductsService.getProductById(productId)
            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await ProductsService.getAllProducts()
            res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req, res, next) {
        try {
            const productId = req.params.id
            const updateData = req.body
            const updatedProduct = await ProductsService.updateProduct(productId, updateData, req.user)
            res.status(200).json(updatedProduct)
        } catch (error) {
            if (error.message === 'Unauthorized') {
                res.status(403).json({ message: 'Unauthorized' })
            } else {
                next(error)
            }
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const productId = req.params.id
            await ProductsService.deleteProduct(productId, req.user)
            res.status(204).send()
        } catch (error) {
            if (error.message === 'Unauthorized') {
                res.status(403).json({ message: 'Unauthorized' })
            } else {
                next(error)
            }
        }
    }

    async getProductsPaginated(req, res, next) {
        try {
            const { page, limit } = req.query
            const paginatedProducts = await ProductsService.getProductsPaginated(page, limit)
            res.status(200).json(paginatedProducts)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductsController()