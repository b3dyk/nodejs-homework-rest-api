const sgMail = require("@sendgrid/mail");
const AppError = require("./appError");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: process.env.SENDGRID_EMAIL };

  try {
    await sgMail.send(email);

    return true;
  } catch (error) {
    throw new AppError(500, "Failed to send verification email");
  }
};

module.exports = sendEmail;
