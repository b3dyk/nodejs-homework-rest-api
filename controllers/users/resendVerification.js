const User = require("../../models/userModel");
const { catchAsync, AppError, sendEmail } = require("../../helpers");

const resendVerification = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError(404, "User with such email doesn't exist"));
  }

  if (user.verify) {
    return next(new AppError(400, "Verification has already been passed"));
  }

  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a href="http://localhost:3001/api/users/verify/${user.verificationToken}" target="_blank">Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({ message: "Verification email sent" });
});

module.exports = resendVerification;
