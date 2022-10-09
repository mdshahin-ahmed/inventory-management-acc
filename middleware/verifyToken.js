const jwt = require("jsonwebtoken");
const { decode } = require("punycode");
const { promisify } = require("util");
const User = require("../models/User");

/**
 1. check if token exists
 2. if not token send res
 3. decode the token
 4. if valid next

 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "you are not logged in",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    // const user = User.findOne({ email: decoded.email });
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: "fail",
      error: "Invalid Token",
    });
  }
};
