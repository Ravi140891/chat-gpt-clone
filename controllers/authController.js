const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

//JWT Token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // validation for existing user

    const existingEmail = userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already registered", 500));
    }

    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation

    if (!email || !password) {
      return next(new errorResponse("Please provide Email or Password"));
    }
    const user = userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid credentials", 401));
    }
    const isMatch = await userModel.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credential", 401));
    }
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};
