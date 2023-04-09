const uuid = require("uuid").v4;
const User = require("../../models/userModel");
const { sendEmail } = require("../../helpers");
const { catchAsync, AppError } = require("../../helpers");

const register = catchAsync(async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) return next(new AppError(409, "Email in use"));

  const verificationToken = uuid();
  const result = await User.create({
    email,
    password,
    subscription,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a href="http://localhost:3001/api/users/verify/${verificationToken}" target="_blank">Confirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
});

module.exports = register;
