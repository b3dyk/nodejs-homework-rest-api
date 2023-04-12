const { Router } = require("express");

const { users: controller } = require("../../controllers");
const {
  auth,
  checkUser,
  uploadAvatar,
  checkEmail,
} = require("../../middlewares");

const router = Router();

router.route("/register").post(checkUser, controller.register);

router.route("/login").post(checkUser, controller.login);

router.route("/logout").post(auth, controller.logout);

router.route("/current").get(auth, controller.getCurrent);

router.route("/avatars").patch(auth, uploadAvatar, controller.updateAvatar);

router.route("/verify").post(checkEmail, controller.resendVerification);

router.route("/verify/:verificationToken").get(controller.verifyEmail);

module.exports = router;
