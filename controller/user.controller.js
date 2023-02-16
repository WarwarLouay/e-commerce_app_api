const user = require("../models/user.model");
const shippingAddress = require("../models/shippingAddress.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;
let verificationCode;

const createToken = (id) => {
  return jwt.sign({ id }, "jsonwebtokenJWTsecretKEY", {
    expiresIn: maxAge,
  });
};

exports.create = async (req, res) => {
  const data = req.body;
  const newData = new user();

  newData.fullName = data.fullName;
  newData.email = data.email;
  newData.phone = data.phone;
  newData.password = data.password;

  let count = await user.countDocuments({ email: newData.email }).exec();
  if (count > 0) {
    return res.status(200).json({ message: "Email already exist" });
  } else {
    await newData.save();

    const newShipping = new shippingAddress();
    newShipping.user = newData._id;
    await newShipping.save();

    return res.status(201).json(newData);
  }
};

exports.login = async (req, res) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  const findUser = await user.login(email, password);
  const token = createToken(findUser._id);
  res.cookie("jwt", token, {
    withCredentials: true,
    httpOnly: false,
    maxAge: maxAge * 1000,
  });
  return res.status(201).json({ user: findUser, token });
};

exports.findAll = async (req, res) => {
  const users = await user.find().sort({ $natural: -1 }).exec();
  return res.status(201).json(users);
};

exports.delete = async (req, res) => {
  await user.findByIdAndDelete(req.body.id).exec();
  return res.status(201).json({ message: "deleted" });
};

exports.loginWithGoogle = async (req, res) => {
  const data = req.body;
  const newData = new user();

  newData.email = data.email;
  newData.fullName = data.fullName;
  newData.password = data.fullName;
  newData.withGoogle = "true";
  newData.country = "Lebanon";
  newData.countryCode = "+961";
  newData.phone = "";

  let count1 = await user
    .countDocuments({ email: newData.email, withGoogle: "false" })
    .exec();
  let count2 = await user
    .countDocuments({ email: newData.email, withGoogle: "true" })
    .exec();
  if (count1 > 0) {
    return res.status(200).json({ message: "Email already exist" });
  } else if (count2 > 0) {
    return res.status(201).json({ message: "loggedin" });
  } else {
    await newData.save();

    const newShipping = new shippingAddress();
    newShipping.user = newData._id;
    await newShipping.save();

    return res.status(201).json({ message: "created" });
  }
};

const saveAccount = async (req, res) => {
  const data = req.body;
  const newData = new user();

  newData.email = data.email;
  newData.fullName = data.password;
  newData.password = data.password;
  newData.withGoogle = "true";

  await newData.save();
  console.log("hello");
};

exports.forgotPassword = async (req, res) => {
  const data = req.body;
  const email = data.email;

  const response = await user.findOne({ email: email }).exec();
  if (response) {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tt5612659@gmail.com",
        pass: "ypiskgvroikhzaiz",
      },
      tls: { rejectUnauthorized: false },
    });

    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    let details = {
      from: "tt5612659@gmail.com",
      to: data.email,
      subject: "Verification Code",
      text: "Your verification code is: " + verificationCode,
    };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail sent.");
      }
    });

    return res.status(201).json({ verificationCode, message: "find" });
  } else {
    return res.status(200).json({ message: "not find" });
  }
};

exports.resendCode = async (req, res) => {
  const data = req.body;
  const email = data.email;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tt5612659@gmail.com",
      pass: "ypiskgvroikhzaiz",
    },
    tls: { rejectUnauthorized: false },
  });

  let newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCode = newVerificationCode

  let details = {
    from: "tt5612659@gmail.com",
    to: email,
    subject: "Verification Code",
    text: "Your verification code is: " + verificationCode,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail sent.");
    }
  });
  return res.status(201).json({ verificationCode, message: "sent" });
};

exports.verifyCode = async (req, res) => {
  const data = req.body;
  const code = data.code;

  if (code === verificationCode) {
    return res.status(201).json({ verificationCode, message: "true" });
  } else {
    return res.status(200).json({ message: "false" });
  }
};

exports.changePassword = async (req, res) => {
  const data = req.body;
  const email = data.email;

  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(data.password, salt);

  await user
    .findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: password,
        },
      },
      { upsert: true }
    )
    .exec();
  return res.status(201).json({ message: "updated" });
};
