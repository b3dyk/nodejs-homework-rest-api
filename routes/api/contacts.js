const { Router } = require("express");

const {
  checkContact,
  checkBody,
  checkFavorite,
  checkExistence,
  auth,
} = require("../../middlewares");
const { contacts: controller } = require("../../controllers");

const router = Router();

router.use(auth);

router
  .route("/")
  .get(controller.getContactsList)
  .post(checkBody, checkExistence, controller.createContact);

router
  .route("/:contactId")
  .get(checkContact, controller.getById)
  .delete(checkContact, controller.deleteContact)
  .put(checkBody, checkContact, controller.putContact);

router
  .route("/:contactId/favorite")
  .patch(checkFavorite, checkContact, controller.updateStatusContact);

module.exports = router;
