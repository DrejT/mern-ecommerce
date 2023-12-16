const authRouter = require("./../routes/auth.route");
const {
  registerAuthSchema,
  loginAuthSchema,
} = require("./../utils/validateschema");
const createError = require("http-errors");
// middleware for validating all the requests coming routes under /auth/admin/*
// authRouter.use(async function (req, res, next) {
//   try {
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

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
    console.log(result);
    next();
  } catch (error) {
    if (error.isJoi === true) {
      return next(createError("Invalid username or password"));
    }
    next(error);
  }
}

module.exports = {
  validateRegisterSchema,
  validateLoginSchema,
};
