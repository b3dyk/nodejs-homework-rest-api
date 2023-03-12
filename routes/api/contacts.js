const { Router } = require("express");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = Router();

router.get("/", listContacts);

router.get("/:contactId", getById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router;
