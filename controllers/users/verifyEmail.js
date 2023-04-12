const User = require("../../models/userModel");
const { catchAsync, AppError } = require("../../helpers");

const verifyEmail = catchAsync(async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
});

module.exports = verifyEmail;
