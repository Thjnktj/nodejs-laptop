const Product = require('../../models/product')
const Order = require('../../models/order')
const User = require('../../models/user')

module.exports = {
    index: (req, res) => {
        res.render('admin/order/index', {
            title: 'Đặt hàng'
        })
    }
}