const User = require("../../models/userModel");
const { catchAsync, AppError } = require("../../helpers");

const register = catchAsync(async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) return next(new AppError(409, "Email in use"));

  const result = await User.create({
    email,
    password,
    subscription,
  });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
});

module.exports = register;
