const productsService = require("../services/products.service")
const usersService = require("../services/users.service")
const CartsService = require('../services/carts.service.js')

class ViewsController {
    static async renderHome(req, res, next) {
        try {
            res.render('home', {
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
                title: 'My Products',
                user: req.user,
                products
            })
        } catch (error) {
            next(error)
        }
    }

    static async renderNewProduct(req, res, next) {
        try {
            res.render('newProduct', { 
                title: 'New Product',
                user: req.user
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

    static async renderSignUp(req, res, next) {
        try {
            res.render('signUp', { title: 'Sign Up' })
        } catch (error) {
            next(error)
        }
    }

    static async renderEditProfile(req, res, next) {
        try {
            res.render('editProfile', {
                title: 'Edit Profiler',
                user: req.user
            })
        } catch (error) {
            next(error)
        }
    }

    static async renderManageUsers(req, res, next) {
        try {
            const users = await usersService.getAllUsers()
            res.render('manageUsers', { 
                title: 'Manage Users',
                user: req.user,
                users
            })
        } catch (error) {
            next(error)
        }
    }

    static async renderCart(req, res, next) {
        try {
            const cart = await CartsService.getCartByUserId(req.user._id)
            res.render('cart', { cart: cart ? cart.toObject() : null, user: req.user })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ViewsController