const Joi = require("joi");

const contactValidator = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = contactValidator;
