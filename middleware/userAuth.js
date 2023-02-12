const user = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "jsonwebtokenJWTsecretKEY", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const u = await user.findById(decodedToken.id);
        if (u) {
          res.json({ status: true, user: u.email });
        } else {
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
