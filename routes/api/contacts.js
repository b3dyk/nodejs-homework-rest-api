const { Router } = require("express");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { checkContact } = require("../../middlewares");

const router = Router();

router.get("/", listContacts);
router.post("/", addContact);

router.get("/:contactId", checkContact, getById);
router.delete("/:contactId", checkContact, removeContact);
router.put("/:contactId", checkContact, updateContact);

module.exports = router;
