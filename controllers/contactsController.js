const { catchAsync } = require("../helpers");
const Contact = require("../models/contactModel");

const getContactsList = catchAsync(async (req, res) => {
  const contacts = await Contact.find().select("-__v");

  res.status(200).json(contacts);
});

const getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId).select("-__v");

  res.status(200).json(contact);
});

const deleteContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ message: "contact deleted" });
});

const createContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
});

const putContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  }).select("-__v");

  res.status(200).json(updatedContact);
});

const updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const favorite = req.body;

  console.log(contactId, favorite);

  const updatedContact = await Contact.findByIdAndUpdate(contactId, favorite, {
    new: true,
  }).select("-__v");

  res.status(200).json(updatedContact);
});

module.exports = {
  getContactsList,
  getById,
  createContact,
  deleteContact,
  putContact,
  updateStatusContact,
};
