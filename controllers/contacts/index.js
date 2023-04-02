const getContactsList = require("./getAll");
const getById = require("./getById");
const deleteContact = require("./deleteById");
const createContact = require("./addContact");
const putContact = require("./updateById");
const updateStatusContact = require("./updateFavorites");

module.exports = {
  getContactsList,
  getById,
  deleteContact,
  createContact,
  putContact,
  updateStatusContact,
};
