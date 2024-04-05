const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    txnId: {
        type: String
    },
    amount: {
        type: Number
    },
    productInfo: {
        type: String
    },
    orderedProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, { timestamps: true, versionKey: false })

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;