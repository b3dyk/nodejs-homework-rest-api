const { catchAsync } = require("../../helpers");
const Contact = require("../../models/contactModel");

const updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const favorite = req.body;

  console.log(contactId, favorite);

  const updatedContact = await Contact.findByIdAndUpdate(contactId, favorite, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

module.exports = updateStatusContact;
