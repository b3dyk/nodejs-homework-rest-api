const { Types } = require("mongoose");
const { AppError, catchAsync, contactValidator } = require("../helpers");
const Contact = require("../models/contactModel");

exports.checkBody = catchAsync(async (req, res, next) => {
  if (!Object.keys(req.body).length)
    return next(new AppError(400, `missing fields`));

  const { error, value } = contactValidator(req.body);

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

exports.checkExistence = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  const nameExists = await Contact.exists({ name });
  const emailExists = await Contact.exists({ email });
  const phoneExists = await Contact.exists({ phone });

  if (nameExists || emailExists || phoneExists)
    return next(
      new AppError(
        409,
        `Contact with this ${
          nameExists ? "name" : emailExists ? "email" : "phone"
        } already exists`
      )
    );

  next();
});

exports.checkContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const isIdValid = Types.ObjectId.isValid(contactId);

  if (!isIdValid) return next(new AppError(404, "Not found"));

  const contactExists = await Contact.exists({ _id: contactId });

  console.log(contactExists);

  if (!contactExists) return next(new AppError(404, "Not found"));

  next();
});

exports.checkFavorite = (req, res, next) => {
  if (!Object.keys(req.body).includes("favorite"))
    return next(new AppError(400, `missing field favorite`));

  next();
};
