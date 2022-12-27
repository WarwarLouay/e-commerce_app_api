const categoryController = require('../controller/categories.controller');
const productController = require('../controller/products.controller');
const cartController = require('../controller/cart.controller');
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
router.get('/cart', cartController.findAll);
router.post('/cart/delete', cartController.delete);

module.exports = router;