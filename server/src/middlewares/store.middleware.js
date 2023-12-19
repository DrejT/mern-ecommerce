const {
  storeCreateSchema,
  storeGetSchema,
} = require("../utils/validateschema");
const StoreModel = require("./../models/store.model");
const createError = require("http-errors");

async function validateStoreCreateSchema(req, res, next) {
  try {
    const result = await storeCreateSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function validateStoreGetSchema(req, res, next) {
  try {
    const result = await storeGetSchema.validateAsync(req.params.name);
    console.log(result);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function authorizeUserSession(req, res, next) {
  try {
    console.log("session is", req.session);
    if (!req.session) {
      throw createError.Unauthorized("You are unauthorized");
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateStoreCreateSchema,
  authorizeUserSession,
  validateStoreGetSchema,
};
