const { catchAsync } = require("../../helpers");
const Contact = require("../../models/contactModel");

const createContact = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json(newContact);
});

module.exports = createContact;
