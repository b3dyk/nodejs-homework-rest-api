const { catchAsync } = require("../../helpers");
const Contact = require("../../models/contactModel");

const getById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId).select("-__v");

  res.status(200).json(contact);
});

module.exports = getById;
