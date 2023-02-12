const mongoose = require("mongoose");

const category = mongoose.model(
  "Category",
  mongoose.Schema({
    categoryEngName: {
      type: String,
    },
    categoryArName: {
      type: String,
    },
    categoryImage: {
      type: String,
    },
  })
);

module.exports = {
  category,
};
