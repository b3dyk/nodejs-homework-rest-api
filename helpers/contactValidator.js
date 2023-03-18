const Joi = require("joi");

const contactValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(data);

module.exports = contactValidator;
