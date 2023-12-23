const itemModel = require("../models/item.model");
const {
  ItemCreateSchema,
  itemGetSchema,
  itemEditSchema,
  mongoIdObjectSchema,
  itemDeleSchema,
} = require("./../utils/validateschema");
const { handleJoiError } = require("./../utils/validateschema");

async function validateItemCreateSchema(req, res, next) {
  try {
    const result = await ItemCreateSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemGetSchema(req, res, next) {
  try {
    const result = await itemGetSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemEditSchema(req, res, next) {
  try {
    const result = await itemEditSchema.validateAsync(req.body.data);
    const resultId = await mongoIdObjectSchema.validateAsync(req.body.itemId);
    req.result = {};
    req.result.data = result;
    req.result.id = resultId;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemDeleteSchema(req, res, next) {
  try {
    const result = await itemDeleSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

module.exports = {
  validateItemCreateSchema,
  validateItemGetSchema,
  validateItemEditSchema,
  validateItemDeleteSchema,
};
