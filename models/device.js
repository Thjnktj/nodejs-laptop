const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
    name: String,
    type: String,
    description: String,
    images: String,
    price: {
        type: Number,
        default: 50000
    },
    protect: {//bảo hành
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 0
    },
    date: String
})

module.exports = mongoose.model('Device', deviceSchema)