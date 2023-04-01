const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const { catchAsync, AppError } = require("../helpers");

const auth = catchAsync(async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") return next(new AppError(401, "Not authorized"));

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) return next(new AppError(401, "Not authorized"));

    req.user = user;

    next();
  } catch (error) {
    next(new AppError(401, "Not authorized"));
  }
});

module.exports = auth;
