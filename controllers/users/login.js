const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { catchAsync, AppError } = require("../../helpers");

const signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new AppError(401, "Email or password is wrong"));

  const passCompare = await user.checkPassword(password, user.password);

  if (!passCompare)
    return next(new AppError(401, "Email or password is wrong"));

  const token = signToken(user._id);

  user.token = token;

  await user.save();

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

module.exports = login;
