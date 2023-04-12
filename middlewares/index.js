const {
  checkContact,
  checkBody,
  checkFavorite,
  checkExistence,
} = require("./contactMiddleware");
const { checkUser } = require("./userMiddleware");
const auth = require("./auth");
const uploadAvatar = require("./uploadAvatar");
const checkEmail = require("./checkEmail");

module.exports = {
  checkContact,
  checkBody,
  checkFavorite,
  checkExistence,
  checkUser,
  auth,
  uploadAvatar,
  checkEmail,
};
