const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
    default: "Lebanon",
  },
  countryCode: {
    type: String,
    default: "+961",
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  withGoogle: {
    type: String,
    default: "false",
  },
});

user.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

user.statics.login = async function (email, password) {
  const userE = await this.findOne({ email });
  if (userE) {
    const auth = await bcrypt.compare(password, userE.password);
    if (auth) {
      return userE;
    }
    return { message: "Incorrect password" };
  }
  return { message: "Incorrect email" };
};

module.exports = mongoose.model("User", user);
