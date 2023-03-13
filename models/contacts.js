const fsPromises = require("fs").promises;
const uuid = require("uuid").v4;

const {
  catchAsync,
  contactsPath,
  contactValidator,
  AppError,
} = require("../helpers");

const listContacts = async (req, res) => {
  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));

  res.status(200).json(contacts);
};

const getById = (req, res) => {
  const { contact } = req;

  res.status(200).json(contact);
};

const removeContact = catchAsync(async (req, res) => {
  const {
    contacts,
    params: { contactId },
  } = req;

  const updatedList = JSON.stringify(
    contacts.filter((contact) => contact.id !== contactId)
  );

  await fsPromises.writeFile(contactsPath, updatedList);

  res.status(200).json({ message: "contact deleted" });
});

const addContact = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  const newUser = {
    id: uuid(),
    name,
    email,
    phone,
  };

  const validation = contactValidator(newUser);

  if (validation.error) {
    return next(
      new AppError(
        400,
        `invalid ${validation.error.details[0].context?.key} field`
      )
    );
  }

  const contacts = JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  const updatedContacts = JSON.stringify([...contacts, newUser]);

  await fsPromises.writeFile(contactsPath, updatedContacts);

  res.status(201).json(newUser);
});

const updateContact = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const { contacts } = req;

  const updatedContact = {
    id: contactId,
    name,
    email,
    phone,
  };

  const validation = contactValidator(updatedContact);

  if (validation.error) {
    return next(
      new AppError(
        400,
        `invalid ${validation.error.details[0].context?.key} field`
      )
    );
  }

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  contacts[idx] = updatedContact;

  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));

  res.status(200).json(contacts[idx]);
});

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
