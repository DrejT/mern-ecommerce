const joi = require("joi");

const usernameSchema = joi.string().alphanum().max(15).lowercase().required();
const emailSchema = joi.string().email().lowercase().required();
const passwordSchema = joi.string().min(8).required();
const roleSchema = joi.string().valid('admin');


// for auth routes
const registerAuthSchema = joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginAuthSchema = joi.object({
  username: usernameSchema,
  password: passwordSchema,
});

// for admin routes
const adminRegisterSchema = joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

const adminLoginSchema = joi.object({
  username: usernameSchema,
  password: passwordSchema,
});

module.exports = {
  registerAuthSchema,
  loginAuthSchema,
  adminRegisterSchema,
  adminLoginSchema,
};
