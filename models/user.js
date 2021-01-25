const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    pass: String,
    address: String,
    phone: String,
    email: String,
    role: {
        type: String,
        default: 'client'
    }
})

module.exports = mongoose.model('User', userSchema)