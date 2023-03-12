const fsPromises = require("fs").promises;
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.join(__dirname, "../models", "./contacts.json");

const listContacts = async (req, res) => {
  try {
    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );

    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );

    const searchedContact = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!searchedContact) return res.status(404).json({ message: "Not found" });

    res.status(200).json(searchedContact);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );

    const searchedContact = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!searchedContact) return res.status(404).json({ message: "Not found" });

    const newList = JSON.stringify(
      contacts.filter((contact) => contact.id !== contactId)
    );

    await fsPromises.writeFile(contactsPath, newList);

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );

    const newUser = {
      id: uuid(),
      name,
      email,
      phone,
    };

    const updatedContacts = JSON.stringify([...contacts, newUser]);

    await fsPromises.writeFile(contactsPath, updatedContacts);

    res.status(200).json({ user: newUser });
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { contactId } = req.params;

    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );

    const newList = contacts.filter((contact) => contact.id !== contactId);

    let contactToUpdate = contacts.find((contact) => contact.id === contactId);

    // contactToUpdate.name = name;
    // contactToUpdate.email = email;
    // contactToUpdate.phone = phone;

    contactToUpdate = {
      id: contactId,
      name,
      email,
      phone,
    };

    const updatedContacts = JSON.stringify([...newList, contactToUpdate]);

    await fsPromises.writeFile(contactsPath, updatedContacts);

    res.status(200).json({ user: contactToUpdate });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
