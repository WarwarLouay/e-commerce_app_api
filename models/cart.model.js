const mongoose = require("mongoose");

const cart = mongoose.model(
  "Cart",
  mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    qty: {
      type: Number,
    },
    size: {
      type: String,
    },
  })
);

module.exports = {
  cart,
};
