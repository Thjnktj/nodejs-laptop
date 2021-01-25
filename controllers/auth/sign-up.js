const User = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = {
    index: (req, res) => {
        res.render('auth/sign-up', {
            mess: '',
        });
    },
    postSignup: (req, res) => {
        User.find({ email: req.body.email })
            .then(user => {
                if (user.length >= 1) {
                    console.log('Tài khoản đã tồn tại');
                    res.redirect('/sign-up');
                }
                else {
                    bcrypt.hash(req.body.pass, 10, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const user = new User({
                                name: req.body.name,
                                email: req.body.email,
                                phone: req.body.phone,
                                address: req.body.address,
                                pass: hash
                            })
                            user.save()
                                .then(() => {
                                    res.redirect('/admin');
                                }).catch(err => {
                                    console.log(err);
                                });
                        }
                    })
                }
            }).catch(err => {
                console.log(err);
            });
    }
    
}