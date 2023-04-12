const { catchAsync, AppError, emailValidator } = require("../helpers");

const checkEmail = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).includes("email")) {
    return next(new AppError(400, "Email is required"));
  }

  if (!Object.keys(req.body).length > 1) {
    return next(new AppError(400, "Too many fields. Only email is required"));
  }

  const { error } = emailValidator(req.body);

  if (error) {
    return next(new AppError(400, `${error.details[0].message}`));
  }

  next();
});

module.exports = checkEmail;
