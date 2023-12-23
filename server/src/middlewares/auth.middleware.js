const {
  registerAuthSchema,
  loginAuthSchema,
} = require("./../utils/validateschema");
const UserModel = require("./../models/user.model");
const createError = require("http-errors");

// middleware for validating all the requests coming routes under /auth/admin/*
// authRouter.use(async function (req, res, next) {
//   try {
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

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

async function authorizeAdminSession(req, res, next) {
  try {
    console.log(req.session);
    // req.session.reload((err) => console.log(err));
    if (!(req.session?.user?.role === "admin")) {
      throw createError.Unauthorized("You are unauthorized");
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function validateRegisterSchema(req, res, next) {
  try {
    const result = await registerAuthSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
}

async function validateLoginSchema(req, res, next) {
  try {
    const result = await loginAuthSchema.validateAsync(req.body);
    req.result = result;
    next();
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError("Invalid username or password"));
    }
    next(error);
  }
}

module.exports = {
  authorizeUserSession,
  authorizeAdminSession,
  validateRegisterSchema,
  validateLoginSchema,
};
