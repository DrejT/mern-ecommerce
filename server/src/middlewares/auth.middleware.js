const { redisStore } = require("../utils/session");
const {
  registerAuthSchema,
  loginAuthSchema,
} = require("./../utils/validateschema");
const createError = require("http-errors");

async function authorizeUserSession(req, res, next) {
  try {
    if (!req.session.user) {
      throw createError.Unauthorized("You are unauthorized");
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function revalidateUserSession(req, res, next) {
  try {
    console.log(req.session);
    // if (req.session) {
    //   const user = redisStore.get(req.session.id);
    //   req.session.user = user;
    //   return res.status(200).send(user);
    // }
  } catch (error) {
    next(error);
  }
}

async function authorizeAdminSession(req, res, next) {
  try {
    console.log(req.session);
    console.log(req.file);
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
  revalidateUserSession,
  validateRegisterSchema,
  validateLoginSchema,
};
