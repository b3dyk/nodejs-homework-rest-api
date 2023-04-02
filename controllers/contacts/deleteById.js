const { catchAsync } = require("../../helpers");
const Contact = require("../../models/contactModel");

const deleteContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  await Contact.findByIdAndDelete(contactId);

  res.status(200).json({ message: "contact deleted" });
});

module.exports = deleteContact;
