const mongoose = require('mongoose')
const Times = require('../middlewares/date');

const productSchema = mongoose.Schema({
    name: String,
    os: String,
    cpu: String,
    processor: String,
    graphics: String,
    ram: String,
    hard: String,
    screen: String,
    wireless: String,
    power: String,
    battery: String,
    price: {
        type: String,
        default: 3000000
    },
    sale: {
        type: Number,
        default: 0
    },
    description: String,
    images: Object,
    status: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: Times.getDate()
    }
});

module.exports = mongoose.model('Product', productSchema)