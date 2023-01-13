const categoryController = require('../controller/categories.controller');
const productController = require('../controller/products.controller');
const cartController = require('../controller/cart.controller');
const userController = require('../controller/user.controller');
const favoriteController = require('../controller/favorite.controller');
const shippingController = require('../controller/shippingAddress.controller');
const orderController = require('../controller/order.controller');
const adminController = require('../controller/admin.controller');
const { checkUser } = require('../middleware/adminAuth');

const express = require('express');
const router = express.Router();

router.post('/category', categoryController.create);
router.get('/category', categoryController.findAll);
router.get('/category/:id', categoryController.findOne);
router.put('/category/:id', categoryController.update);
router.post('/category/delete', categoryController.delete);

router.post('/product', productController.create);
router.get('/product', productController.findAll);
router.post('/product/delete', productController.delete);
router.post('/product/update', productController.update);

router.post('/cart', cartController.create);
router.post('/cart/get', cartController.findAll);
router.post('/cart/delete', cartController.delete);

router.post('/favorite', favoriteController.create);
router.post('/favorite/get', favoriteController.findAll);

router.post('/shipping', shippingController.update);
router.post('/shipping/get', shippingController.findAll);

router.post('/order', orderController.create);
router.post('/order/get', orderController.findAll);

router.post('/user', userController.create);
router.get('/user', userController.findAll);
router.post('/user/delete', userController.delete);
router.post('/user/login', userController.login);

router.post('/admin/login', adminController.login);
router.post('/admin', checkUser);

module.exports = router;