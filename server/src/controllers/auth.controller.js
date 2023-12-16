const UserModel = require("../models/user.model");
const { signAccessToken } = require("../utils/jwt");
const createError = require("http-errors");

async function register(req, res, next) {
  try {
    // const result = await registerAuthSchema.validateAsync(req.body);
    // console.log(result);
    const emailExist = await UserModel.findOne({ email: req.result.email });
    if (emailExist) {
      throw createError.Conflict(`${req.result.email} is already registered`);
    }

    const usernameExist = await UserModel.findOne({
      username: req.result.username,
    });
    if (usernameExist) {
      throw createError.Conflict(
        `${req.result.username} is already registered`
      );
    }

    const user = new UserModel({
      username: req.result.username,
      email: req.result.email,
      password: req.result.password,
      role: req.result.role === "admin" ? "admin" : "user",
    });
    const savedUser = await user.save();
    // const accessToken = await signAccessToken(savedUser.id);
    res.send({ message: "registered successfully" });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await UserModel.findOne({ username: req.result.username });
    console.log(user);
    if (!user) {
      throw createError.NotFound("user is not registered");
    }
    const validPassword = await user.isPasswordValid(req.result.password);
    if (!validPassword) {
      throw createError.Unauthorized("username or password not valid");
    }

    // const accessToken = await signAccessToken(user.id);
    req.session.user = req.result;
    req.session.message = "login successful";
    console.log(req.session);
    res.status(200).send(req.session);
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

module.exports = {
  register,
  login,
};
