const mongoose = require("mongoose");

const admin = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", admin, "admin");
