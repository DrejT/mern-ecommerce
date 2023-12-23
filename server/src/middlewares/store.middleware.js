const {
  handleJoiError,
  storeCreateSchema,
  storeGetSchema,
  storeEditSchema,
  storeDeleteSchema,
  mongoIdObjectSchema,
} = require("../utils/validateschema");
const StoreModel = require("./../models/store.model");
const createError = require("http-errors");

async function validateStoreCreateSchema(req, res, next) {
  try {
    const result = await storeCreateSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateStoreGetSchema(req, res, next) {
  try {
    const result = await storeGetSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateStoreEditSchema(req, res, next) {
  try {
    const result = await storeEditSchema.validateAsync(req.body.data);
    const resultId = await mongoIdObjectSchema.validateAsync(req.body.storeId);
    req.result = {};
    req.result.data = result
    req.result.id = resultId;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateStoreDeleteSchema(req, res, next) {
  try {
    const result = await storeDeleteSchema.validateAsync(req.params.id);
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

module.exports = {
  validateStoreCreateSchema,
  validateStoreGetSchema,
  validateStoreEditSchema,
  validateStoreDeleteSchema,
};
