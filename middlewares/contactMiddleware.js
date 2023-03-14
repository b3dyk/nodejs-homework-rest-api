const fsPromises = require("fs").promises;

const {
  AppError,
  catchAsync,
  contactValidator,
  contactsPath,
} = require("../helpers");

exports.checkBody = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return next(new AppError(400, `missing fields`));

  const { error, value } = contactValidator(req.body);

  if (error)
    return next(
      new AppError(
        400,
        `missing required ${error.details[0].context?.key} field`
      )
    );

  req.body = value;

  next();
};

exports.checkContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  const searchedContact = contacts.find(({ id }) => id === contactId);

  if (!searchedContact) return next(new AppError(404, "Not found"));

  next();
});
