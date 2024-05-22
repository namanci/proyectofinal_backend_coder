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
                //layout: 'main',
                title: 'Products',
                user: req.user,
                products
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ViewsController