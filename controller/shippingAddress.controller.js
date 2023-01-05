const shippingAddress = require('../models/shippingAddress.model');

exports.findAll = async (req, res, next) => {
    const shipping = await shippingAddress.findOne({ user: req.body.user }).exec();
    return res.status(201).json(shipping);
};