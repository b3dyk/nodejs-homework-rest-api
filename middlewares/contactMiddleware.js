const { Types } = require("mongoose");
const { AppError, catchAsync, contactValidator } = require("../helpers");
const Contact = require("../models/contactModel");

exports.checkBody = catchAsync(async (req, res, next) => {
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

  const nameExists = await Contact.exists({ name: value.name });
  const emailExists = await Contact.exists({ email: value.email });

  if (nameExists || emailExists)
    return next(
      new AppError(
        409,
        `Contact with this ${nameExists ? "name" : "email"} already exists`
      )
    );

  req.body = value;

  next();
});

exports.checkContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const isIdValid = await Types.ObjectId.isValid(contactId);

  if (!isIdValid) return next(new AppError(404, "Not found"));

  const contactExists = Contact.exists({ _id: contactId });

  if (!contactExists) return next(new AppError(404, "Not found"));

  next();
});

exports.checkFavorite = (req, res, next) => {
  if (!Object.keys(req.body).includes("favorite"))
    return next(new AppError(400, `missing field favorite`));

  next();
};
