const fsPromises = require("fs").promises;

const { contactsPath } = require("../helpers");

const listContacts = async () => {
  try {
    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );

    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );
    const contact = contacts.find(({ id }) => id === contactId);

    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );

    const updatedList = JSON.stringify(
      contacts.filter(({ id }) => id !== contactId)
    );

    await fsPromises.writeFile(contactsPath, updatedList);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const newUser = body;

    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );
    const updatedContacts = JSON.stringify([...contacts, newUser]);

    await fsPromises.writeFile(contactsPath, updatedContacts);

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = {
      id: contactId,
      ...body,
    };
    const contacts = JSON.parse(
      await fsPromises.readFile(contactsPath, "utf-8")
    );
    const idx = contacts.findIndex(({ id }) => id === contactId);

    contacts[idx] = updatedContact;

    await fsPromises.writeFile(contactsPath, JSON.stringify(contacts));

    return contacts[idx];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
