const {
  registerAuthSchema,
  loginAuthSchema,
} = require("../utils/validateschema");
const UserModel = require("./../models/user.models");
const { signAccessToken } = require("../utils/jwt");
require("./../middlewares/user.middleware");
const createError = require("http-errors");

async function register(req, res, next) {
  try {
    const result = await registerAuthSchema.validateAsync(req.body);
    const emailExist = await UserModel.findOne({ email: result.email });
    if (emailExist) {
      throw createError.Conflict(`${result.email} is already registered`);
    }

    const nameExist = await UserModel.findOne({ name: result.name });
    if (nameExist) {
      throw createError.Conflict(`${result.name} is already registered`);
    }

    const user = new UserModel({
      name: result.name,
      email: result.email,
      password: result.password,
    });
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.id);
    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await loginAuthSchema.validateAsync(req.body);
    const user = await UserModel.findOne({ name: result.name });
    if (!user) {
      return createError.NotFound("user is not registered");
    }
    const validPassword = await user.isPasswordValid(result.password);
    if (!validPassword) {
      throw createError.Unauthorized("username or password not valid");
    }

    const accessToken = await signAccessToken(user.id);
    console.log("this is req", req.payload);
    res.send({ accessToken });
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError("Invalid username or password"));
    }
    next(error);
  }
}

module.exports = {
  register,
  login,
};
