const { catchAsync } = require("../../helpers");
const Contact = require("../../models/contactModel");

const getContactsList = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }).populate(
    "owner",
    "_id email"
  );

  res.status(200).json(contacts);
});

module.exports = getContactsList;
