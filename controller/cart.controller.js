const { cart } = require("../models/cart.model");

exports.create = async (req, res) => {
  const data = req.body;
  const newData = new cart();

  newData.user = data.user;
  newData.productId = data.productId;
  newData.qty = data.qty;
  newData.size = data.size;

  await newData.save();
  return res.status(201).json(newData);
};

exports.findAll = async (req, res) => {
  const cat = await cart
    .find({ user: req.body.user })
    .populate("productId")
    .sort({ $natural: -1 })
    .exec();
  return res.status(201).json(cat);
};

exports.delete = async (req, res) => {
  const cat = await cart
    .findOneAndDelete({ _id: req.body.id, user: req.body.user })
    .exec();
  return res.status(201).json(cat);
};
