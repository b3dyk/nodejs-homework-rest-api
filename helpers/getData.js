const fsPromises = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "../models", "./contacts.json");

exports.getData = async () => {
  try {
    return JSON.parse(await fsPromises.readFile(contactsPath, "utf-8"));
  } catch (error) {
    console.log(error);
  }
};
