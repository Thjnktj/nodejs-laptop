const Product = require('../../models/product');
const Times = require('../../middlewares/date');
const Value = require('../../middlewares/validation');

module.exports = {
    index: (req, res) => {
        Product.find()
            .select('_id images name date count')
            .then(data => {
                res.render('admin/product/index', {
                    title: 'Sản phẩm',
                    data: data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    },
    create: (req, res) => {
        res.render('admin/product/create')
    },
    postCreate: (req, res) => {
        const product = new Product({
            name: req.body.name,
            os: req.body.os,
            cpu: req.body.cpu,
            screen: req.body.screen,
            ram: req.body.ram,
            hard: req.body.hard,
            power: req.body.power,
            graphics: req.body.graphics,
            wireless: req.body.wireless,
            battery: req.body.battery,
            price: Value.getMoney(req.body.price),
            sale: req.body.sale,
            count: req.body.count,
            images: req.body.images,
            description: req.body.description,
            date: Times.getDate()
        })

        product.save()
            .then(() => {
                res.redirect('/admin/product');
            })
            .catch(err => {
                console.log(err);
            });
    },
    update: (req, res) => {
        Product.find({ _id: req.params.id })
            .then(data => {
                const result = data.map(item => {
                    return {
                        _id: item._id,
                        name: item.name,
                        os: item.os,
                        cpu: item.cpu,
                        screen: item.screen,
                        ram: item.ram,
                        hard: item.hard,
                        power: item.power,
                        graphics: item.graphics,
                        wireless: item.wireless,
                        battery: item.battery,
                        price: item.price,
                        sale: item.sale,
                        count: item.count,
                        images: item.images,
                        description: item.description,
                    }
                })
                res.render('admin/product/update', {
                    data: result[0]
                })
            })
            .catch(err => {
                console.log(err);
            });
    },
    postUpdate: (req, res) => {
        const product = {
            name: req.body.name,
            os: req.body.os,
            cpu: req.body.cpu,
            screen: req.body.screen,
            ram: req.body.ram,
            hard: req.body.hard,
            power: req.body.power,
            graphics: req.body.graphics,
            wireless: req.body.wireless,
            battery: req.body.battery,
            price: Value.getMoney(req.body.price),
            sale: req.body.sale,
            count: req.body.count,
            images: req.body.images,
            description: req.body.description,
            date: Times.getDate()
        }

        Product.updateOne({_id: req.params.id}, {$set: product})
            .then(() => {
                res.redirect('/admin/product');
            })
            .catch(err => {
                console.log(err);
            });
    },
    delete: async(req, res) => {
        await Product.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/admin/product');
            })
            .catch(err => {
                console.log(err);
            });
    }
}