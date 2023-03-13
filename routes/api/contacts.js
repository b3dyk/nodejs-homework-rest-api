const { Router } = require("express");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { checkContact, checkBody } = require("../../middlewares");

const router = Router();

router.get("/", listContacts);
router.post("/", checkBody, addContact);

router.get("/:contactId", checkContact, getById);
router.delete("/:contactId", checkContact, removeContact);
router.put("/:contactId", checkBody, checkContact, updateContact);

module.exports = router;
