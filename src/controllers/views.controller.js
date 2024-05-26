const productsService = require("../services/products.service")

class ViewsController {
    static async renderHome(req, res, next) {
        try {
            res.render('home', {
                //layout: 'main',
                title: 'Home',
                user: req.user
            })
        } catch (error) {
            next(error)
        }
    }

    static async renderProducts(req, res, next) {
        try {
            const products = await productsService.getAllProducts()
            res.render('products', {
                title: 'Products',
                user: req.user,
                products
            })
        } catch (error) {
            next(error)
        }
    }

    static async renderUserProducts(req, res, next) {
        try {
            const userId = req.user._id
            const products = await productsService.getUserProducts(userId)
            res.render('userProducts', { 
                user: req.user,
                products
            })
        } catch (error) {
            next(error)
        }
    }

    static async renderEditProduct(req, res, next) {
        try {
            const productId = req.params.id
            const product = await productsService.getProductById(productId)
            res.render('editProduct', { 
                title: 'Edit Product',
                user: req.user,
                product: product.toObject()
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ViewsController