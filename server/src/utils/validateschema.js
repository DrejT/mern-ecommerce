const joi = require("joi");

const usernameSchema = joi.string().alphanum().max(15).lowercase().required();
const emailSchema = joi.string().email().lowercase().required();
const passwordSchema = joi.string().min(8).required();
const roleSchema = joi.string().valid("admin");

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

// for store routes

const storeNameSchema = joi.string().alphanum().max(250).lowercase().required();
const storeEmailSchema = joi.string().email().lowercase().required();
const storeDescriptionSchema = joi.string().min(10).required();

const storeCreateSchema = joi.object({
  name: storeNameSchema,
  businessEmail: storeEmailSchema,
  description: storeDescriptionSchema,
});

const storeGetSchema = storeNameSchema;

module.exports = {
  // auth and admin routes
  registerAuthSchema,
  loginAuthSchema,
  adminRegisterSchema,
  adminLoginSchema,

  // store routes
  storeCreateSchema,
  storeGetSchema,
};
