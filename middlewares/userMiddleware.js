const { catchAsync, userValidator, AppError } = require("../helpers");

exports.checkUser = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).length)
    return next(new AppError(400, `missing fields`));

  if (Object.keys(req.body).length > 2)
    return next(new AppError(400, `only email and password fields required`));

  const { error, value } = userValidator(req.body);

  if (error) {
    const missingFields = error.details?.map((item) => item.context.key);
    const fields =
      missingFields.length === 1
        ? missingFields.join("")
        : missingFields.join(" & ");
    return next(new AppError(400, `missing required ${fields} field(s)`));
  }

  req.body = value;

  next();
});
