const order = require('../models/order.model');
const { cart } = require('../models/cart.model');

exports.create = async (req, res) => {

    const data = req.body;
    const newData = new order();

    newData.user = data.user;
    newData.shipping = data.shipping;
    newData.product = data.product;
    newData.total = data.total;
    newData.date = data.date;


    await newData.save();
    await cart.deleteMany({ user: data.user }).exec();
    return res.status(201).json(newData);
};

exports.findAllByUser = async (req, res) => {
    const ord = await order.find({ user: req.body.user }).populate('user').populate('shipping').populate({
        path: 'product',
        populate: 'product',
    }).exec();
    return res.status(201).json(ord);
};

exports.findAll = async (req, res) => {
    const ord = await order.find().populate('user').populate('shipping').populate({
        path: 'product',
        populate: 'product',
    }).exec();
    return res.status(201).json(ord);
};

exports.delete = async (req, res) => {
    await order.findByIdAndDelete(req.body.id).exec();
    return res.status(201).json({message: 'deleted'});
};