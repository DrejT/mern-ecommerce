const joi = require("joi");

const registerAuthSchema = joi.object({
  name: joi.string().lowercase().required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(8).required()
});

const loginAuthSchema = joi.object({
  name: joi.string().lowercase().required(),
  password: joi.string().min(8).required()
});

module.exports = {
    registerAuthSchema,
    loginAuthSchema
}
