const Product = require('../../models/product');
const User = require('../../models/user');

module.exports = {
    index: (req, res) => {
        res.render('admin/home/index', {
            title: 'Admin Page',
            product: 4,
            order: 3,
            device: 10,
            user: 5
        });
    },
    indexUser: (req, res) => {
        User.find()
            .select('_id name phone email address')
            .then(data => {
                res.render('admin/user/index', {
                    data: data,
                    title: 'Người dùng'
                })
            })
            .catch(err => {
                console.log(err);
            });
    },
    delete: (req, res) => {
        User.find({ _id: req.params.id })
            .then(user => {
                if (user[0].role === 'admin') {
                    res.redirect('/admin/users');
                }
                else {
                    User.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.redirect('/admin/users');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}