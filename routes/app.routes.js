const categoryController = require("../controller/categories.controller");
const productController = require("../controller/products.controller");
const cartController = require("../controller/cart.controller");
const userController = require("../controller/user.controller");
const favoriteController = require("../controller/favorite.controller");
const shippingController = require("../controller/shippingAddress.controller");
const orderController = require("../controller/order.controller");
const adminController = require("../controller/admin.controller");
const { checkAdmin } = require("../middleware/adminAuth");
const { checkUser } = require("../middleware/userAuth");

const express = require("express");
const router = express.Router();

router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.post("/category/delete", categoryController.delete);

router.post("/product", productController.create);
router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOneById);
router.post("/product/delete", productController.delete);
router.post("/product/update", productController.update);
router.get("/product/category/:id", productController.findByCategory);

router.post("/cart", cartController.create);
router.post("/cart/get", cartController.findAll);
router.post("/cart/delete", cartController.delete);

router.post("/favorite", favoriteController.create);
router.post("/favorite/get", favoriteController.findAll);

router.post("/shipping", shippingController.update);
router.post("/shipping/get", shippingController.findAll);

router.post("/order", orderController.create);
router.get("/order/getall", orderController.findAll);
router.post("/order/get", orderController.findAllByUser);
router.post("/order/delete", orderController.delete);
router.get("/order/:id", orderController.findOneById);
router.post("/order/accept", orderController.acceptOrder);
router.post("/order/reject", orderController.rejectOrder);

router.post("/user", userController.create);
router.get("/user", userController.findAll);
router.post("/user/delete", userController.delete);
router.post("/user/login", userController.login);
router.post("/user/google/login", userController.loginWithGoogle);
router.post("/user/forgotpassword", userController.forgotPassword);
router.post("/user/verifycode", userController.verifyCode);
router.post("/user/changepassword", userController.changePassword);
router.post("/user/resendcode", userController.resendCode);
router.post("/user/auth", checkUser);

router.post("/admin/login", adminController.login);
router.post("/admin", checkAdmin);

module.exports = router;
