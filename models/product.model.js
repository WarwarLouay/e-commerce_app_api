const mongoose = require("mongoose");

const product = mongoose.model(
  "Product",
  mongoose.Schema({
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    productEngName: {
      type: String,
    },
    productArName: {
      type: String,
    },
    productEngDescription: {
      type: String,
    },
    productArDescription: {
      type: String,
    },
    productImage: {
      type: String,
    },
    productPrice: {
      type: String,
    },
    usersFavorite: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  })
);

module.exports = {
  product,
};
