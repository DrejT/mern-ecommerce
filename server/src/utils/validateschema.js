const joi = require("joi");

const usernameSchema = joi.string().alphanum().max(15).lowercase().required();
const emailSchema = joi.string().email().lowercase().required();
const passwordSchema = joi.string().min(8).required();
const roleSchema = joi.string().valid("admin");

function handleJoiError(error) {
  if (error.isJoi === true) {
    error.status = 422;
    return error;
  }
  return;
}

const mongoIdObjectSchema = joi.string().length(24);

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

// admin schemas
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

// store schemas

const storeNameSchema = joi.string().max(250).lowercase();
const storeEmailSchema = joi.string().email().lowercase();
const storeDescriptionSchema = joi.string().min(10);

const storeCreateSchema = joi.object({
  name: storeNameSchema.required(),
  businessEmail: storeEmailSchema.required(),
  description: storeDescriptionSchema.required(),
});

const storeGetSchema = mongoIdObjectSchema.required();

const storeEditSchema = joi.object({
  name: storeNameSchema,
  businessEmail: storeEmailSchema,
  description: storeDescriptionSchema,
});

const storeDeleteSchema = mongoIdObjectSchema.required();

// item schemas

const itemNameSchema = joi.string().max(250);
const itemDescrptionSchema = joi.string().max(500);
const itemImageUrlSchema = joi.string();
const itemSaleSchema = joi.number();
const itemPriceSchema = joi.number();
const itemAmountSchema = joi.number();
const itemOnShelfSchema = joi.boolean();

const ItemCreateSchema = joi.object({
  name: itemNameSchema.required(),
  description: itemDescrptionSchema.required(),
  imageUrl: itemImageUrlSchema.required(),
  sale: itemSaleSchema.required(),
  price: itemPriceSchema.required(),
  amount: itemAmountSchema.required(),
  onShelf: itemOnShelfSchema.required(),
});

const itemGetSchema = mongoIdObjectSchema.required();

const itemEditSchema = joi.object({
  itemId: mongoIdObjectSchema,
  name: itemNameSchema,
  description: itemDescrptionSchema,
  imageUrl: itemImageUrlSchema,
  sale: itemSaleSchema,
  price: itemPriceSchema,
  amount: itemAmountSchema,
  onShelf: itemOnShelfSchema,
});

const itemDeleSchema = mongoIdObjectSchema.required();

// review schemas

const reviewCommentSchema = joi.string().max(500);
const reviewRatingSchema = joi.number().max(5).min(1);

const reviewGetSChema = mongoIdObjectSchema.required();

const reviewCreateSChema = joi.object({
  comment: reviewCommentSchema,
  rating: reviewRatingSchema.required(),
});

const reviewEditSchema = joi.object({
  comment: reviewCommentSchema,
  rating: reviewRatingSchema,
});

const reviewDeleteSchema = mongoIdObjectSchema.required();

module.exports = {
  // handle unprocessed request
  handleJoiError,
  mongoIdObjectSchema,

  // auth and admin schema
  registerAuthSchema,
  loginAuthSchema,
  adminRegisterSchema,
  adminLoginSchema,

  // store schemas
  storeCreateSchema,
  storeGetSchema,
  storeEditSchema,
  storeDeleteSchema,

  // item schemas
  ItemCreateSchema,
  itemGetSchema,
  itemEditSchema,
  itemDeleSchema,

  // review Schemas

  reviewGetSChema,
  reviewCreateSChema,
  reviewEditSchema,
  reviewDeleteSchema,
};
