//Import jwt and dotenv
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Get secret key from .env
const secretKey = process.env.SECRET_KEY;


//Create token
exports.generateToken = (user) => {
  return jwt.sign({ _id: user._id, displayName: user.displayName }, secretKey, {
    expiresIn: "10d",
  });
};


//Verify token
exports.verifyToken = (req, res, next) => {
  //Bearer token
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.userData = jwt.verify(token, secretKey);
    next();

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired!",
      });
    }

    return res.status(401).json({
      message: "Access restricted! Please Login!",
    });
  }
};
