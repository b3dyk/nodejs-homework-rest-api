const { Router } = require("express");

const { checkContact, checkBody } = require("../../middlewares");
const {
  getContactsList,
  getById,
  createContact,
  deleteContact,
  putContact,
} = require("../../controllers");

const router = Router();

router.get("/", getContactsList);
router.post("/", checkBody, createContact);

router.get("/:contactId", checkContact, getById);
router.delete("/:contactId", checkContact, deleteContact);
router.put("/:contactId", checkBody, checkContact, putContact);

module.exports = router;
