const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

connectToDB();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(({ status, message }, req, res, next) => {
  res.status(status || 500).json({ message });
});

module.exports = app;
