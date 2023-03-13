const Joi = require("joi");

const contactValidator = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
      .required(),
    phone: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = contactValidator;
