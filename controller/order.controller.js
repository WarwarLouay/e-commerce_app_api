const order = require("../models/order.model");
const { cart } = require("../models/cart.model");
const nodemailer = require("nodemailer");

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

  const orderDetail = await order
    .findById(newData._id)
    .populate("user")
    .populate("shipping")
    .populate({
      path: "product",
      populate: "product",
    })
    .exec();

  const products = orderDetail.product.map((ord) => {
    let imageSrc = `https://smiling-coveralls-crow.cyclic.app/${ord.product.productImage}`
    return (
      '<tr>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      `<img style="width: 100px" src=${imageSrc} />` +
      '<p>' + ord.product.productEngName + '</p>' +
      '</td>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      ord.qty +
      '</td>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      '$' + ord.product.productPrice +
      '</td>' +
      '</tr>'
    );
  });

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tt5612659@gmail.com",
      pass: "ypiskgvroikhzaiz",
    },
    tls: { rejectUnauthorized: false },
  });

  let details = {
    from: "tt5612659@gmail.com",
    to: data.email,
    subject: "Order",
    html:
      '<table style="border: 1px solid #333; width: 100%; border-collapse: collapse;">' +
      '<tr>' +
      '<th style="border: 1px solid #333;">Product</th>' +
      '<th style="border: 1px solid #333;">Quantity</th>' +
      '<th style="border: 1px solid #333;">Price</th>' +
      '</tr>' +
      products +
      '</table>' + 

      '<div style="width: 100%; text-align: end">' +
      '<b>Total: </b>' + '$' + orderDetail.total +
      '</div>' +

      '<h4>Shipping Address</h4>' +

      '<table style="border: 1px solid #333; width: 100%; border-collapse: collapse;">' +
      '<tr>' +
      '<th style="border: 1px solid #333;">Full Name</th>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      '<p>' + orderDetail.user.fullName + '</p>' +
      '</td>' +
      '</tr>' +

      '<tr>' +
      '<th style="border: 1px solid #333;">Email</th>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      '<p>' + orderDetail.user.email + '</p>' +
      '</td>' +
      '</tr>' +

      '<tr>' +
      '<th style="border: 1px solid #333;">Phone</th>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      '<p>' + orderDetail.user.phone + '</p>' +
      '</td>' +
      '</tr>' +

      '<tr>' +
      '<th style="border: 1px solid #333;">Address</th>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      '<p>' + orderDetail.shipping.Address + '</p>' +
      '</td>' +
      '</tr>' +

      '<tr>' +
      '<th style="border: 1px solid #333;">Street</th>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      '<p>' + orderDetail.shipping.Street + '</p>' +
      '</td>' +
      '</tr>' +

      '<tr>' +
      '<th style="border: 1px solid #333;">Building</th>' +
      '<td style="text-align: center; border: 1px solid #333;">' +
      '<p>' + orderDetail.shipping.Building + '</p>' +
      '</td>' +
      '</tr>' +
      '</table>'
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail sent.");
    }
  });

  return res.status(201).json(newData);
};

exports.findAllByUser = async (req, res) => {
  const ord = await order
    .find({ user: req.body.user })
    .populate("user")
    .populate("shipping")
    .populate({
      path: "product",
      populate: "product",
    })
    .sort({ $natural: -1 })
    .exec();
  return res.status(201).json(ord);
};

exports.findAll = async (req, res) => {
  const ord = await order
    .find()
    .populate("user")
    .populate("shipping")
    .populate({
      path: "product",
      populate: "product",
    })
    .sort({ $natural: -1 })
    .exec();
  return res.status(201).json(ord);
};

exports.delete = async (req, res) => {
  await order.findByIdAndDelete(req.body.id).exec();
  return res.status(201).json({ message: "deleted" });
};

exports.findOneById = async (req, res) => {
  const orderDetail = await order
    .findById(req.params.id)
    .populate("user")
    .populate("shipping")
    .populate({
      path: "product",
      populate: "product",
    })
    .exec();
  return res.status(201).json(orderDetail);
};

exports.acceptOrder = async (req, res) => {
  await order
    .findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          status: "1",
        },
      },
      { upsert: true }
    )
    .exec();
  return res.status(201).json({ message: "accepted" });
};

exports.rejectOrder = async (req, res) => {
  await order
    .findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          status: "-1",
        },
      },
      { upsert: true }
    )
    .exec();
  return res.status(201).json({ message: "rejected" });
};
