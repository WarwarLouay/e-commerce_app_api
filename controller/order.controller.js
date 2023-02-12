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
    text: "We have recieved your order, it may take about 5 days to deliver your order. You can check the status of your order by entering the orders page on the application or website.",
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
