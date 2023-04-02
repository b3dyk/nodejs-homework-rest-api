const Joi = require("joi");

const userValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required(),
      password: Joi.string().min(6).required(),
    })
    .validate(data);

module.exports = userValidator;
