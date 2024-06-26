const productModel = require('../models/product.model.js')

class ProductsRepository {
    async createProduct(productData) {
        const product = new productModel(productData)
        return await product.save()
    }

    async getAllProducts() {
        return await productModel.find().lean().populate('owner')
    }

    async getProductById(productId) {
        return await productModel.findById(productId).populate('owner')
    }

    async getProductsByOwner(ownerId) {
        return await productModel.find({ owner: ownerId }).lean()
    }

    async updateProduct(productId, updateData) {
        return await productModel.findByIdAndUpdate(productId, updateData, { new: true })
    }

    async deleteProduct(productId) {
        return await productModel.findByIdAndDelete(productId)
    }

    async getProductsPaginated(page, limit) {
        return await productModel.paginate({}, { page, limit })
    }
}

module.exports = new ProductsRepository()