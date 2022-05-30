//library for validating the body
const Joi = require("joi");

const registrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    //validating email without Joi > we would have to use regex
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registrationValidation,
  loginValidation,
};
