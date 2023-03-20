const { Router } = require("express");

const {
  checkContact,
  checkBody,
  checkFavorite,
  checkExistence,
} = require("../../middlewares");
const {
  getContactsList,
  getById,
  createContact,
  deleteContact,
  putContact,
  updateStatusContact,
} = require("../../controllers");

const router = Router();

router
  .route("/")
  .get(getContactsList)
  .post(checkBody, checkExistence, createContact);

router
  .route("/:contactId")
  .get(checkContact, getById)
  .delete(checkContact, deleteContact)
  .put(checkBody, checkContact, putContact);

router
  .route("/:contactId/favorite")
  .patch(checkFavorite, checkContact, updateStatusContact);

module.exports = router;
