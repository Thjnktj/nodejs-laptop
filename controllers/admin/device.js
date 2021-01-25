const Device = require('../../models/device')
const Times = require('../../middlewares/date')

module.exports = {
    index: (req, res) => {
        Device.find()
            .then(data => {
                res.render('admin/device/index', {
                    title: 'Phụ kiện',
                    data: data
                });
            })
            .catch();
    },
    create: (req, res) => {
        res.render('admin/device/create', {
            title: 'Thêm phụ kiện'
        });
    },
    postCreate: (req, res) => {
        let images = req.body.images;
        const device = new Device({
            name: req.body.name,
            type: req.body.type,
            count: req.body.count,
            price: req.body.price,
            protect: req.body.protect,
            images: images[0].filename,
            description: req.body.description,
            date: Times.getDate(),
        })

        device.save()
            .then(() => {
                res.redirect('/admin/device')
            }).catch(err => {
                console.log(err);
            });
    },
    update: (req, res) => {
        Device.find({ _id: req.params.id })
            .select('_id price name description protect type images count')
            .then(data => {
                res.render('admin/device/update', {
                    title: 'Cập nhật thiết bị',
                    data: data[0]
                })
            })
            .catch(err => {
                console.log(err);
            });
    },
    postUpdate: (req, res) => {
        const device = {
            name: req.body.name,
            type: req.body.type,
            count: req.body.count,
            price: req.body.price,
            protect: req.body.protect,
            description: req.body.description,
            date: Times.getDate(),
        }

        Device.updateOne({ _id: req.params.id }, { $set: device })
            .then(() => {
                res.redirect('/admin/device')
            })
            .catch(err => {
                console.log(err);
            });
    },
    delete: (req, res) => {
        Device.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/admin/device')
            })
            .catch(err => {
                console.log(err);
            });
    }
}