const uuid = require("uuid").v4;

const { catchAsync } = require("../helpers");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContactsList = catchAsync(async (req, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

const getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  res.status(200).json(contact);
});

const deleteContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  await removeContact(contactId);

  res.status(200).json({ message: "contact deleted" });
});

const createContact = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  await addContact(newContact);

  res.status(201).json(newContact);
});

const putContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  await updateContact(contactId, body);

  const updatedContact = await getContactById(contactId);

  res.status(200).json(updatedContact);
});

module.exports = {
  getContactsList,
  getById,
  createContact,
  deleteContact,
  putContact,
};
