const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    index: (req, res) => {
        if (!req.signedCookies.userId) {
            if (!req.signedCookies.adminId) {
                res.render('auth/sign-in');
            }
            else {
                res.clearCookie('adminId');
                res.render('auth/sign-in');
            }
        }
        else {
            res.clearCookie('userId');
            res.redirect('/');
        }
    },
    postSignin: (req, res) => {
        User.find({ email: req.body.email })
            .then(user => {
                if (user.length < 1) {
                    console.log('Tài khoản không tồn tại');
                    req.redirect('/sign-in');
                }
                else {
                    bcrypt.compare(req.body.pass, user[0].pass, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result) {
                            if (user[0].role === 'admin') {
                                res.cookie('adminId', user[0]._id, {
                                    signed: true,
                                    expires: new Date(Date.now() + 60 * 60 * 1000),
                                    httpOnly: false
                                });
                                res.redirect('/admin');
                            }
                            else {
                                res.cookie('userId', user[0]._id, {
                                    signed: true,
                                    expires: new Date(Date.now() + 60 * 60 * 1000),
                                    httpOnly: false
                                });
                                res.redirect('/');
                            }
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}