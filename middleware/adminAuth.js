const admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");

module.exports.checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "jsonwebtokenJWTsecretKEY", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await admin.findById(decodedToken.id);
        if (user) {
          res.json({ status: true, user: user.username });
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
