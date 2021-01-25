const mongoose = require('mongoose')
const Times = require('../middlewares/date')

const orderSchema = mongoose.Schema({
    code: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        default: 50000
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        default: Times.getTime()
    }
})

module.exports = mongoose.model('Order', orderSchema);