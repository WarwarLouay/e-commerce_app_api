const admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "jsonwebtokenJWTsecretKEY", {
    expiresIn: maxAge,
  });
};

exports.login = async (req, res) => {
  const data = req.body;
  let adminUsername = await admin.findOne({ username: data.username }).exec();
  if (adminUsername) {
    let adminPassword = await admin
      .findOne({ username: data.username, password: data.password })
      .exec();
    if (adminPassword) {
      const token = createToken(adminPassword._id);
      res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      return res.status(201).json({ adminPassword, token });
    } else {
      return res.status(200).json({ message: "wrong_password" });
    }
  } else {
    return res.status(200).json({ message: "wrong_username" });
  }
};
