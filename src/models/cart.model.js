const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true, default: 1 }
})

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    items: [cartItemSchema],
    totalCost: { type: Number, required: true, default: 0 }
},
{versionKey: false}
)

module.exports = mongoose.model('carts', cartSchema)