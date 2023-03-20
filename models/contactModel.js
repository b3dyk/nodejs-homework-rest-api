const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    unique: [true, "Contact with this name already exists"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
    unique: [true, "Contact with this email already exists"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
    unique: [true, "Contact with this phone already exists"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("Contact", contactSchema);

module.exports = Contact;
