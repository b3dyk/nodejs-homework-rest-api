const User = require("../../models/userModel");
const { catchAsync } = require("../../helpers");

const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.sendStatus(204);
});

module.exports = logout;
