const fsPromises = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "../models", "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");

    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
