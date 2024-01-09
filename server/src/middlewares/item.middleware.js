require("dotenv").config();
const {
  ItemCreateSchema,
  itemGetSchema,
  itemEditSchema,
  mongoIdObjectSchema,
  itemDeleSchema,
  itemGetAllSchema,
} = require("./../utils/validateschema");
const { handleJoiError } = require("./../utils/validateschema");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const ax = require("../utils/axios");

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

async function validateItemGetAllSchema(req, res, next) {
  try {
    if (req.session.user.stores.length === 0) {
      return res.status(200).send("no stores to fetch");
    }
    const result = await itemGetAllSchema.validateAsync(
      req.session.user.stores
    );
    req.result = result;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

async function validateItemEditSchema(req, res, next) {
  try {
    const result = await itemEditSchema.validateAsync(req.body);
    req.result = result;
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

async function uploadImage(req, res, next) {
  try {
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader
        .upload_stream((error, uploadResult) => {
          console.log(uploadResult);
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });
    req.result.imageUrl = uploadResult.url;
    next();
  } catch (error) {
    handleJoiError(error);
    next(error);
  }
}

module.exports = {
  validateItemCreateSchema,
  validateItemGetSchema,
  validateItemGetAllSchema,
  validateItemEditSchema,
  validateItemDeleteSchema,
  uploadImage,
};
