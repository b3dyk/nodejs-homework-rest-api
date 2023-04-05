const fsPromises = require("fs").promises;
const Jimp = require("jimp");
const path = require("path");
const User = require("../../models/userModel");

const { catchAsync, AppError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = catchAsync(async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const imageName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    await fsPromises.rename(tmpUpload, resultUpload);

    Jimp.read(resultUpload, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250).quality(90).write(resultUpload);
    });

    const avatarURL = path.join("public", "avatars", imageName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fsPromises.unlink(tmpUpload);
    throw new AppError(500, "Oops, something went wrong");
  }
});

module.exports = updateAvatar;
