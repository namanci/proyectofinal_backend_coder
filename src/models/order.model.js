const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    items: [orderItemSchema],
    totalCost: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('orders', orderSchema)