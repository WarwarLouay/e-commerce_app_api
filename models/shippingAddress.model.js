const mongoose = require("mongoose");

const shippingAddress = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Address: {
    type: String,
    default: "",
  },
  Street: {
    type: String,
    default: "",
  },
  Building: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("ShippingAddress", shippingAddress);
