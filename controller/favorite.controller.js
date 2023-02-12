const favotite = require("../models/favorite.model");
const { product } = require("../models/product.model");

exports.create = async (req, res) => {
  const data = req.body;
  const newData = new favotite();

  newData.user = data.user;
  newData.product = data.product;

  let count = await favotite
    .findOne({ user: newData.user, product: newData.product })
    .exec();
  if (count) {
    await favotite
      .findOneAndDelete({ user: newData.user, product: newData.product })
      .exec();
  } else {
    await newData.save();
  }

  let prod = await product.findOne({ _id: req.body.product }).exec();
  if (prod.usersFavorite.includes(req.body.user)) {
    prod.usersFavorite.remove(req.body.user);
  } else {
    prod.usersFavorite.push(req.body.user);
  }
  await prod.save();

  return res.status(201).json(prod);
};

exports.findAll = async (req, res, next) => {
  const cat = await favotite
    .find({ user: req.body.user })
    .populate("product")
    .populate("user")
    .sort({ $natural: -1 })
    .exec();
  return res.status(201).json(cat);
};
