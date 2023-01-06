const categoryController = require('../controller/categories.controller');
const productController = require('../controller/products.controller');
const cartController = require('../controller/cart.controller');
const userController = require('../controller/user.controller');
const favoriteController = require('../controller/favorite.controller');
const shippingController = require('../controller/shippingAddress.controller');
const orderController = require('../controller/order.controller');
const express = require('express');
const router = express.Router();

router.post('/category', categoryController.create);
router.get('/category', categoryController.findAll);
router.get('/category/:id', categoryController.findOne);
router.put('/category/:id', categoryController.update);
router.delete('/category/:id', categoryController.delete);

router.post('/product', productController.create);
router.get('/product', productController.findAll);

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
router.post('/user/login', userController.login);

module.exports = router;