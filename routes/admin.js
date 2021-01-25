const express = require('express');

//Call controller
const homeController = require('../controllers/admin/index');
const productController = require('../controllers/admin/product');
const deviceController = require('../controllers/admin/device');
const orderController = require('../controllers/admin/order');

//call middleware
const multiple = require('../middlewares/images');

const router = express.Router();

let upload = async (req, res, next) => {
    try {
        await multiple(req, res);
        let listImages = req.files.map(item => {
            return {
                filename: item.filename
            }
        })
        req.body.images = listImages;
    }
    catch (err){
        console.log(err);
    }
    next();
}

//router admin page
router.get('/', homeController.index)

//router product page
router.get('/product', productController.index)

router.get('/product/create', productController.create)

router.post('/product/create',upload , productController.postCreate)

router.get('/product/u=:id', productController.update)

router.post('/product/u=:id',upload, productController.postUpdate)

router.get('/product/d=:id', productController.delete)

//router device page
router.get('/device', deviceController.index)

router.get('/device/create', deviceController.create)

router.post('/device/create',upload , deviceController.postCreate)

router.get('/device/u=:id', deviceController.update)

router.post('/device/u=:id',upload, deviceController.postUpdate)

router.get('/device/d=:id', deviceController.delete)

//router order page
router.get('/order', orderController.index)

//router user page
router.get('/users', homeController.indexUser)

router.get('/users/d=:id', homeController.delete)

module.exports = router;