const { cart } = require('../models/cart.model');

exports.create = async (req, res, next) => {

    const data = req.body;
    const newData = new cart();

    newData.productId = data.productId;
    newData.qty = data.qty;

    await newData.save();
    return res.status(201).json(newData);
};

exports.findAll = async (req, res, next) => {
    const cat = await cart.find().populate('productId').exec();
    return res.status(201).json(cat);
};

exports.delete = async (req, res, next) => {
    const cat = await cart.findByIdAndDelete(req.body.id).exec();
    return res.status(201).json(cat);
};