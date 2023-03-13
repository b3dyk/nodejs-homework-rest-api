const fsPromises = require("fs").promises;

const { AppError, catchAsync, contactsPath } = require("../helpers");

exports.checkContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  const searchedContact = contacts.find((contact) => contact.id === contactId);

  if (!searchedContact) return next(new AppError(404, "Not found"));

  req.contacts = contacts;
  req.contact = searchedContact;

  next();
});
