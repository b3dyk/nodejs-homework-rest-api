const { catchAsync } = require("../../helpers");
const Contact = require("../../models/contactModel");

const putContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

module.exports = putContact;
