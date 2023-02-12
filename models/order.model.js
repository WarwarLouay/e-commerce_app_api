const mongoose = require("mongoose");

const order = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  shipping: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingAddress",
  },
  product: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: {
        type: String,
      },
      size: {
        type: String,
      },
    },
  ],
  total: {
    type: String,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("Order", order);
