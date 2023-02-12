const shippingAddress = require("../models/shippingAddress.model");

exports.findAll = async (req, res, next) => {
  const shipping = await shippingAddress
    .findOne({ user: req.body.user })
    .exec();
  return res.status(201).json(shipping);
};

exports.update = async (req, res, next) => {
  const data = req.body;

  const adr = await shippingAddress
    .findOneAndUpdate(
      { user: data.user },
      {
        $set: {
          Address: data.address,
          Street: data.street,
          Building: data.building,
        },
      },
      { upsert: true }
    )
    .exec();
  return res.status(201).json(adr);
};
